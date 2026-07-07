const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: 'system_settings',
  },
  loanCtaLink: {
    type: String,
    default: '/lead-loan',
  },
  insuranceCtaLink: {
    type: String,
    default: '/lead-insurance',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Setting', SettingSchema);
