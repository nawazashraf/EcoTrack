const ActivityData = require("../models/ActivityData");

exports.getOverview = async (req, res) => {
  try {
    const pipeline = [
      { $group: { _id: "$scope", totalCO2e: { $sum: "$co2e" } } },
    ];
    const data = await ActivityData.aggregate(pipeline);
    const total = data.reduce((acc, curr) => acc + curr.totalCO2e, 0);

    res.json({ totalEmissions: total.toFixed(2), breakdown: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrends = async (req, res) => {
  try {
    const data = await ActivityData.aggregate([
      {
        $match: {
          date: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalCO2e: { $sum: "$co2e" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalCO2e: 1,
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching trends:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const data = await ActivityData.aggregate([
      { $group: { _id: "$category", total: { $sum: "$co2e" } } },
    ]);

    const totalEmissions = data.reduce((acc, curr) => acc + curr.total, 0);
    const recommendations = [];

    data.forEach((item) => {
      const percentage = (item.total / totalEmissions) * 100;

      if (percentage > 40) {
        if (item._id.toLowerCase().includes("electricity")) {
          recommendations.push({
            category: item._id,
            impact: "High",
            suggestion:
              "High electricity usage detected (>40%). Switch to LED lighting and install motion sensors.",
          });
        } else if (item._id.toLowerCase().includes("fuel")) {
          recommendations.push({
            category: item._id,
            impact: "Critical",
            suggestion:
              "Fuel consumption is your largest emission source. Consider fleet electrification.",
          });
        }
      }
    });

    if (recommendations.length === 0) {
      recommendations.push({
        category: "General",
        impact: "Low",
        suggestion:
          "Great job! Your emissions are balanced. Continue monitoring.",
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

    const monthlyData = await ActivityData.aggregate([
      { $match: { date: { $gte: threeMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          monthlyTotal: { $sum: "$co2e" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const avg =
      monthlyData.reduce((a, b) => a + b.monthlyTotal, 0) /
      (monthlyData.length || 1);

    const normalized =
      avg >= 1000
        ? { value: +(avg / 1000).toFixed(2), unit: "tCO2e" }
        : { value: +avg.toFixed(2), unit: "kgCO2e" };

    res.json({
      predictionForNextMonth: normalized,
      basedOn: "3-month moving average",
      trend:
        monthlyData.length >= 2 &&
        monthlyData[monthlyData.length - 1].monthlyTotal >
          monthlyData[0].monthlyTotal
          ? "Increasing"
          : "Stable",
      confidence:
        monthlyData.length >= 6
          ? "High"
          : monthlyData.length >= 3
          ? "Medium"
          : "Low",
      suggestion:
        avg > 1000
          ? "Projected to exceed limits. Reduce consumption."
          : "On track to meet reduction goals.",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComparison = async (req, res) => {
  try {
    const data = await ActivityData.aggregate([
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          co2e: 1,
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          total: { $sum: "$co2e" },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": -1 } },
      { $limit: 2 },
    ]);

    if (data.length < 2) {
      return res.json({
        message: "Not enough data to compare periods",
      });
    }

    const [current, previous] = data;

    const change = current.total - previous.total;
    const percentage =
      previous.total === 0 ? 0 : ((change / previous.total) * 100).toFixed(1);

    res.json({
      currentPeriod: {
        label: `${current._id.month}/${current._id.year}`,
        totalCO2e: current.total.toFixed(2),
      },
      previousPeriod: {
        label: `${previous._id.month}/${previous._id.year}`,
        totalCO2e: previous.total.toFixed(2),
      },
      change: {
        absolute: change.toFixed(2),
        percentage,
        trend: change < 0 ? "Decrease" : "Increase",
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmissionBySource = async (req, res) => {
  try {
    const data = await ActivityData.aggregate([
      {
        $group: {
          _id: "$category",
          totalCO2e: { $sum: "$co2e" },
        },
      },
      {
        $sort: { totalCO2e: -1 },
      },
    ]);

    const grandTotal = data.reduce((acc, curr) => acc + curr.totalCO2e, 0);

    const response = data.map((item) => ({
      category: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      totalCO2e: parseFloat(item.totalCO2e.toFixed(2)),
      percentage:
        grandTotal > 0
          ? parseFloat(((item.totalCO2e / grandTotal) * 100).toFixed(2))
          : 0,
    }));

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
