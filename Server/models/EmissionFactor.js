const mongoose = require('mongoose');

const EmissionFactorSchema = new mongoose.Schema({
  category: { type: String, required: true }, 
  factor: { type: Number, required: true },   
  unit: { type: String, required: true },     
  region: { type: String, default: "India" },
  year: { type: Number, default: 2024 },
  source: { type: String, default: "IPCC/EPA" }
});

module.exports = mongoose.model('EmissionFactor', EmissionFactorSchema);