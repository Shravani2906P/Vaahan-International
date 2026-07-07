const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['auto-loan', 'insurance'],
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  // Auto Loan specific fields
  preferredCar: {
    type: String,
    trim: true,
  },
  loanAmount: {
    type: String,
    trim: true,
  },
  monthlyIncome: {
    type: String,
    trim: true,
  },
  employmentType: {
    type: String,
    trim: true,
  },
  // Insurance specific fields
  carModel: {
    type: String,
    trim: true,
  },
  carYear: {
    type: String,
    trim: true,
  },
  // New Auto Loan fields
  carBudget: {
    type: String,
    trim: true,
  },
  downPayment: {
    type: String,
    trim: true,
  },
  // New Insurance fields
  carModelOrBudget: {
    type: String,
    trim: true,
  },
  insuranceType: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted'],
    default: 'new',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Lead', LeadSchema);
