const ActivityData = require('../models/ActivityData');
const { Parser } = require('json2csv');

exports.downloadReport = async (req, res) => {
  try {
    const activities = await ActivityData.find({}).lean();

    if (!activities.length) {
      return res.status(404).json({ error: "No data available to export" });
    }

    const fields = ['date', 'category', 'value', 'unit', 'co2e', 'scope', 'department', 'source'];
    
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(activities);

    res.header('Content-Type', 'text/csv');
    res.attachment('carbon_report.csv');
    
    return res.send(csv);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};