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
        } else if (item._id.toLowerCase().includes('diesel')) {
          recommendations.push({
            category: item._id,
            impact: "Critical",
            suggestion: "Diesel consumption is your largest emission source. Consider fleet electrification."
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
    const data = await ActivityData.aggregate([
      { $group: { _id: null, avg: { $avg: "$co2e" } } }
    ]);
    const prediction = data.length ? data[0].avg : 0;
    res.json({ prediction: prediction.toFixed(2), suggestion: "Reduce energy usage!" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
