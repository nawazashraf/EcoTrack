const ActivityData = require('../models/ActivityData');
const calculateEmission = require('../utils/calculate');
const fs = require('fs');
const csv = require('csv-parser');

exports.addActivity = async (req, res) => {
  try {
    const { category, value, unit, date, department } = req.body;
    const { co2e, scope } = await calculateEmission(category, value);
    const newActivity = await ActivityData.create({
      user: req.user.id, 
      department: department || "General",
      category, value, unit, date, co2e, scope,
      source: 'Manual'
    });

    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.uploadCSV = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const results = [];
  const batchId = Date.now().toString();
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        let count = 0;
        for (const row of results) {
          if (row.Category && row.Value) {
            const val = parseFloat(row.Value);
            const { co2e, scope } = await calculateEmission(row.Category, val);

            await ActivityData.create({
              user: req.user.id,
              department: row.Department || "General",
              category: row.Category,
              value: val,
              unit: row.Unit || 'unit',
              date: new Date(row.Date),
              source: 'CSV',
              batchId, co2e, scope
            });
            count++;
          }
        }
        fs.unlinkSync(req.file.path);
        res.status(200).json({ message: `Processed ${count} records`, batchId });
      } catch (error) {
        res.status(500).json({ error: "CSV Error" });
      }
    });
};

exports.deleteActivity = async (req, res) => {
  try {
    const activity = await ActivityData.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    await activity.deleteOne();
    res.json({ message: "Activity removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
