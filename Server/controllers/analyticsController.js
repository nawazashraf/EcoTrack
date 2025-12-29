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

exports.getPrediction = async (req, res) => {
  try {
    const data = await ActivityData.aggregate([
      { $group: { _id: null, avg: { $avg: "$co2e" } } }
    ]);
    const prediction = data.length ? data[0].avg : 0;
    res.json({ prediction: prediction.toFixed(2), suggestion: "Reduce energy usage!" });
  } catch (err) { res.status(500).json({ error: err.message }); }
};