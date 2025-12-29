const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  organizationName: { type: String, required: true },
  department: { type: String, default: "General" },
  branch: { type: String, default: "Main" },
  hasCompletedOnboarding: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);