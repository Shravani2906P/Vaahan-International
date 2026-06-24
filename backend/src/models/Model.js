// backend/src/models/Model.js
const mongoose = require('mongoose');

const ModelSchema = new mongoose.Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  bodyType: {
    type: String,
    enum: ['SUV', 'Sedan', 'Hatchback', 'MUV', 'Coupe', 'Convertible'],
    default: 'SUV',
  },
  seatingCapacity: {
    type: Number,
    min: 2,
    max: 10,
    default: 5,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

ModelSchema.index({ brandId: 1 });
ModelSchema.index({ slug: 1 });

module.exports = mongoose.model('Model', ModelSchema);