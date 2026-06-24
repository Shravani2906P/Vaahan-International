// backend/src/models/Variant.js
const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  modelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Model',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
  },
  exShowroomPrice: {
    type: Number,
  },
  onRoadPrice: {
    type: Number,
  },
  engine: {
    type: String,
    trim: true,
  },
  displacement: {
    type: String,
    trim: true,
  },
  fuelType: {
    type: String,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'CNG', 'N/A'],
    default: 'N/A',
  },
  transmission: {
    type: String,
    enum: ['Manual', 'Automatic', 'AMT', 'CVT', 'DCT', 'EV', 'N/A', 'IVT', 'AutoSHIFT+', 'DCA'],
    default: 'N/A',
  },
  power: {
    type: String,
    trim: true,
  },
  torque: {
    type: String,
    trim: true,
  },
  mileage: {
    type: String,
    trim: true,
  },
  overallScore: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  scores: {
    safetyScore: { type: Number, min: 0, max: 10, default: 0 },
    performanceScore: { type: Number, min: 0, max: 10, default: 0 },
    drivingExperienceScore: { type: Number, min: 0, max: 10, default: 0 },
    suspensionScore: { type: Number, min: 0, max: 10, default: 0 },
    comfortScore: { type: Number, min: 0, max: 10, default: 0 },
    featuresScore: { type: Number, min: 0, max: 10, default: 0 },
    valueForMoneyScore: { type: Number, min: 0, max: 10, default: 0 },
    cityDrivingScore: { type: Number, min: 0, max: 10, default: 0 },
    highwayDrivingScore: { type: Number, min: 0, max: 10, default: 0 },
    familyScore: { type: Number, min: 0, max: 10, default: 0 },
    maintenanceScore: { type: Number, min: 0, max: 10, default: 0 },
  },
  factorScores: {
    safetyScore: {
      airbags: { type: Number, min: 0, max: 10, default: 0 },
      adas: { type: Number, min: 0, max: 10, default: 0 },
      ncapRating: { type: Number, min: 0, max: 10, default: 0 },
      braking: { type: Number, min: 0, max: 10, default: 0 },
      structuralSafety: { type: Number, min: 0, max: 10, default: 0 },
    },
    performanceScore: {
      enginePower: { type: Number, min: 0, max: 10, default: 0 },
      torque: { type: Number, min: 0, max: 10, default: 0 },
      acceleration: { type: Number, min: 0, max: 10, default: 0 },
      highwayPerformance: { type: Number, min: 0, max: 10, default: 0 },
      gearboxResponse: { type: Number, min: 0, max: 10, default: 0 },
    },
    drivingExperienceScore: {
      steeringFeedback: { type: Number, min: 0, max: 10, default: 0 },
      handling: { type: Number, min: 0, max: 10, default: 0 },
      stability: { type: Number, min: 0, max: 10, default: 0 },
      rideQuality: { type: Number, min: 0, max: 10, default: 0 },
      driverConfidence: { type: Number, min: 0, max: 10, default: 0 },
    },
    suspensionScore: {
      rideComfort: { type: Number, min: 0, max: 10, default: 0 },
      potholeAbsorption: { type: Number, min: 0, max: 10, default: 0 },
      highwayStability: { type: Number, min: 0, max: 10, default: 0 },
      corneringSupport: { type: Number, min: 0, max: 10, default: 0 },
    },
    comfortScore: {
      seatQuality: { type: Number, min: 0, max: 10, default: 0 },
      cabinInsulation: { type: Number, min: 0, max: 10, default: 0 },
      acEffectiveness: { type: Number, min: 0, max: 10, default: 0 },
      rearSeatComfort: { type: Number, min: 0, max: 10, default: 0 },
      rideSmoothness: { type: Number, min: 0, max: 10, default: 0 },
    },
    featuresScore: {
      infotainment: { type: Number, min: 0, max: 10, default: 0 },
      connectedCar: { type: Number, min: 0, max: 10, default: 0 },
      sunroof: { type: Number, min: 0, max: 10, default: 0 },
      ventilatedSeats: { type: Number, min: 0, max: 10, default: 0 },
      ambientLighting: { type: Number, min: 0, max: 10, default: 0 },
    },
    valueForMoneyScore: {
      priceVsFeatures: { type: Number, min: 0, max: 10, default: 0 },
      safetyPackage: { type: Number, min: 0, max: 10, default: 0 },
      performanceValue: { type: Number, min: 0, max: 10, default: 0 },
      resaleValue: { type: Number, min: 0, max: 10, default: 0 },
      overallPackage: { type: Number, min: 0, max: 10, default: 0 },
    },
    cityDrivingScore: {
      steeringResponsiveness: { type: Number, min: 0, max: 10, default: 0 },
      turningRadius: { type: Number, min: 0, max: 10, default: 0 },
      visibility: { type: Number, min: 0, max: 10, default: 0 },
      easeOfParking: { type: Number, min: 0, max: 10, default: 0 },
      trafficManeuverability: { type: Number, min: 0, max: 10, default: 0 },
    },
    highwayDrivingScore: {
      highSpeedStability: { type: Number, min: 0, max: 10, default: 0 },
      cruiseControl: { type: Number, min: 0, max: 10, default: 0 },
      overtakingAbility: { type: Number, min: 0, max: 10, default: 0 },
      fuelEfficiency: { type: Number, min: 0, max: 10, default: 0 },
      cabinNoise: { type: Number, min: 0, max: 10, default: 0 },
    },
    familyScore: {
      rearSeatSpace: { type: Number, min: 0, max: 10, default: 0 },
      bootCapacity: { type: Number, min: 0, max: 10, default: 0 },
      childSafety: { type: Number, min: 0, max: 10, default: 0 },
      easeOfEntry: { type: Number, min: 0, max: 10, default: 0 },
      familyFeatures: { type: Number, min: 0, max: 10, default: 0 },
    },
    maintenanceScore: {
      serviceCost: { type: Number, min: 0, max: 10, default: 0 },
      spareParts: { type: Number, min: 0, max: 10, default: 0 },
      serviceNetwork: { type: Number, min: 0, max: 10, default: 0 },
      reliability: { type: Number, min: 0, max: 10, default: 0 },
      warranty: { type: Number, min: 0, max: 10, default: 0 },
    },
  },
  specifications: {
    type: Map,
    of: String,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

VariantSchema.index({ modelId: 1 });
VariantSchema.index({ overallScore: -1 });

VariantSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Variant', VariantSchema);