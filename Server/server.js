require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/activity', require('./routes/activityRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

const EmissionFactor = require('./models/EmissionFactor');
app.get('/api/seed', async (req, res) => {
  await EmissionFactor.deleteMany({});
  await EmissionFactor.insertMany([
    { category: "electricity", factor: 0.82, unit: "kgCO2e/kWh" },
    { category: "diesel", factor: 2.68, unit: "kgCO2e/liter" },
    { category: "petrol", factor: 2.31, unit: "kgCO2e/liter" }
  ]);
  res.send("Emission Factors Seeded!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`>> Server running on port ${PORT}`));
