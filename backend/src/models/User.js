// backend/src/models/User.js
/*
================================================================================
File Name : User.js
Author : Tahseen Raza
Created Date : 2026-06-22
Description : User model with Email & Phone support
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    sparse: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  authProvider: {
    type: String,
    enum: ['email', 'phone', 'both'],
    default: 'email',
  },
  lastLogin: {
    type: Date,
  },
  // ========================================
  // Saved Location (Zomato-style global location)
  // ========================================
  // Mirrors what's stored client-side in localStorage under
  // `locationContext`, so a logged-in user's location follows them across
  // devices instead of only persisting per-browser.
  savedLocation: {
    city: { type: String, trim: true },
    district: { type: String, trim: true },
    state: { type: String, trim: true },
    stateCode: { type: String, trim: true, uppercase: true },
    pincode: { type: String, trim: true },
    country: { type: String, trim: true, default: 'India' },
    latitude: { type: Number },
    longitude: { type: Number },
    updatedAt: { type: Date },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);