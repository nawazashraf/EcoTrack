const ActivityData = require('../models/ActivityData');

exports.getOverview = async (req, res) => {
  try {
    const pipeline = [
      { $group: { _id: "$scope", totalCO2e: { $sum: "$co2e" } } }
    ];
    const data = await ActivityData.aggregate(pipeline);
    const total = data.reduce((acc, curr) => acc + curr.totalCO2e, 0);
    
    res.json({ totalEmissions: total.toFixed(2), breakdown: data });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getTrends = async (req, res) => {
  try {
    const data = await ActivityData.aggregate([
      { 
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          total: { $sum: "$co2e" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getRecommendations = async (req, res) => {
  try {
    const data = await ActivityData.aggregate([
      { $group: { _id: "$category", total: { $sum: "$co2e" } } }
    ]);

    const totalEmissions = data.reduce((acc, curr) => acc + curr.total, 0);
    const recommendations = [];

    data.forEach(item => {
      const percentage = (item.total / totalEmissions) * 100;

      if (percentage > 40) {
        if (item._id.toLowerCase().includes('electricity')) {
          recommendations.push({
            category: item._id,
            impact: "High",
            suggestion: "High electricity usage detected (>40%). Switch to LED lighting and install motion sensors."
          });
        } else if (item._id.toLowerCase().includes('fuel')) {
          recommendations.push({
            category: item._id,
            impact: "Critical",
            suggestion: "Fuel consumption is your largest emission source. Consider fleet electrification."
          });
        }
      }
    });

    if (recommendations.length === 0) {
      recommendations.push({ 
        category: "General", 
        impact: "Low", 
        suggestion: "Great job! Your emissions are balanced. Continue monitoring." 
      });
    }

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPrediction = async (req, res) => {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const data = await ActivityData.aggregate([
      { 
        $match: { 
          date: { $gte: threeMonthsAgo } 
        } 
      },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          monthlyTotal: { $sum: "$co2e" }
        }
      },
      {
        $group: {
          _id: null,
          avgMonthlyEmission: { $avg: "$monthlyTotal" }
        }
      }
    ]);

    const prediction = data.length ? data[0].avgMonthlyEmission : 0;
    
    let suggestion = "On track to meet reduction goals.";
    if (prediction > 1000) suggestion = "Projected to exceed limits. Reduce consumption.";

    res.json({ 
      predictionForNextMonth: parseFloat(prediction.toFixed(2)), 
      basedOn: "3-month moving average",
      suggestion 
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getComparison = async (req, res) => {
  try {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    
    let prevMonth = currentMonth - 1;
    let prevYear = currentYear;
    if (prevMonth === 0) { prevMonth = 12; prevYear = currentYear - 1; }

    const data = await ActivityData.aggregate([
      {
        $project: { year: { $year: "$date" }, month: { $month: "$date" }, co2e: 1 }
      },
      {
        $match: {
          $or: [
            { year: currentYear, month: currentMonth },
            { year: prevYear, month: prevMonth }
          ]
        }
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          total: { $sum: "$co2e" }
        }
      }
    ]);

    const current = data.find(d => d._id.month === currentMonth)?.total || 0;
    const previous = data.find(d => d._id.month === prevMonth)?.total || 0;
    const change = current - previous;

    res.json({
      currentPeriod: { value: current.toFixed(2) },
      previousPeriod: { value: previous.toFixed(2) },
      change: change.toFixed(2),
      trend: change < 0 ? "Decreasing" : "Increasing"
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getEmissionBySource = async (req, res) => {
  try {
    const data = await ActivityData.aggregate([
      {
        $group: {
          _id: "$category",
          totalCO2e: { $sum: "$co2e" }
        }
      },
      {
        $sort: { totalCO2e: -1 }
      }
    ]);

    const grandTotal = data.reduce((acc, curr) => acc + curr.totalCO2e, 0);

    const response = data.map(item => ({
      category: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      totalCO2e: parseFloat(item.totalCO2e.toFixed(2)),
      percentage: grandTotal > 0 ? parseFloat(((item.totalCO2e / grandTotal) * 100).toFixed(2)) : 0
    }));

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};