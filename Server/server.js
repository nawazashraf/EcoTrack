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
  try {
    await EmissionFactor.deleteMany({});

    await EmissionFactor.insertMany([
      { 
        category: "electricity", 
        factor: 0.82, 
        unit: "kgCO2e/kWh", 
        source: "CEA 2024" 
      },
      
      { 
        category: "fuel", 
        factor: 2.50, 
        unit: "kgCO2e/liter", 
        source: "EPA Average" 
      },

      { 
        category: "transportation", 
        factor: 0.14, 
        unit: "kgCO2e/km", 
        source: "DEFRA" 
      },
      
      { 
        category: "waste", 
        factor: 0.57, 
        unit: "kgCO2e/kg", 
        source: "IPCC" 
      },

      { 
        category: "manufacturing", 
        factor: 0.80, 
        unit: "kgCO2e/kg", 
        source: "Industry Avg" 
      }
    ]);

    res.send("Emission Factors Seeded Successfully! (Fuel, Electricity, Transport, Waste, Manufacturing)");
  } catch (err) {
    res.status(500).send("Seeding Failed: " + err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`>> Server running on port ${PORT}`));