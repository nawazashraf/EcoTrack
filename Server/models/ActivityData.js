const mongoose = require('mongoose');

const ActivityDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, required: true },
  value: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: Date, required: true },
  department: { type: String },
  source: { type: String, enum: ['Manual', 'CSV'], default: 'Manual' },
  batchId: { type: String }, 
  co2e: { type: Number },     
  scope: { type: String }    
});

module.exports = mongoose.model('ActivityData', ActivityDataSchema);