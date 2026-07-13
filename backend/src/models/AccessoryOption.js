// backend/src/models/AccessoryOption.js
/*
================================================================================
File Name : AccessoryOption.js
Description : Master catalog of optional accessories a customer can add to
              their on-road price quote (Extended Warranty, RSA, Basic
              Kit, Accessories Package, etc.). Nothing here is hardcoded
              into the pricing engine — the engine only ever sums whatever
              subset of these the caller says was selected.
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const mongoose = require('mongoose');

const AccessoryOptionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    enum: ['warranty', 'assistance', 'protection', 'accessory-kit', 'other'],
    default: 'other',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('AccessoryOption', AccessoryOptionSchema);
