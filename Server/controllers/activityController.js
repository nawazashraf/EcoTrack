const ActivityData = require('../models/ActivityData');
const csv = require('csv-parser');
const fs = require('fs');

// 1. The "Bulletproof" Upload Function
exports.uploadActivity = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Clean Keys (Handle BOM and whitespace)
        const cleanRow = {};
        Object.keys(data).forEach(key => {
          const cleanKey = key.trim().toLowerCase().replace(/^\ufeff/, '');
          cleanRow[cleanKey] = data[key];
        });
        results.push(cleanRow);
      })
      .on('end', async () => {
        try {
          const activities = results.map(row => {
            if (!row.category || !row.value) return null;

            // Scope Logic
            let scope = "Scope 3";
            const cat = row.category.toLowerCase();
            if (['fuel', 'refrigerants', 'combustion'].some(x => cat.includes(x))) scope = "Scope 1";
            if (['electricity', 'heating', 'cooling'].some(x => cat.includes(x))) scope = "Scope 2";

            return {
              category: row.category,
              value: parseFloat(row.value),
              unit: row.unit || "kg",
              date: row.date ? new Date(row.date) : new Date(),
              department: row.department || "General",
              scope: scope,
              co2e: (parseFloat(row.value) * 0.5) // Demo calculation
            };
          }).filter(item => item !== null);

          if (activities.length > 0) {
            await ActivityData.insertMany(activities);
            fs.unlinkSync(filePath); // Delete temp file
            res.status(200).json({ message: `Processed ${activities.length} records successfully` });
          } else {
            res.status(200).json({ message: "Processed 0 records. Check CSV headers." });
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. The Add Activity Function (Manual Entry)
exports.addActivity = async (req, res) => {
  try {
    const { category, value, unit, date, department } = req.body;
    
    // Scope Logic
    let scope = "Scope 3";
    const cat = category.toLowerCase();
    if (['fuel', 'refrigerants'].some(x => cat.includes(x))) scope = "Scope 1";
    if (['electricity', 'heating'].some(x => cat.includes(x))) scope = "Scope 2";

    const newActivity = new ActivityData({
      category,
      value,
      unit,
      date,
      department,
      scope,
      co2e: value * 0.5 // Simplified
    });

    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 3. The Delete All Function (For Cleanup)
exports.deleteAllActivities = async (req, res) => {
  try {
    await ActivityData.deleteMany({});
    res.status(200).json({ message: "All records deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};