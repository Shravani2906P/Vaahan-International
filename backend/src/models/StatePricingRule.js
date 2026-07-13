// backend/src/models/StatePricingRule.js
/*
================================================================================
File Name : StatePricingRule.js
Description : Single source of truth for every India state/UT's on-road
              price rules. Nothing in the pricing engine hardcodes a tax
              number — everything reads from a document in this collection.
              Editing one document here changes the calculated on-road
              price for every vehicle in that state, automatically.
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const mongoose = require('mongoose');

// Road tax in India is near-universally a slab structure based on the
// ex-showroom price, and frequently different for petrol/diesel vs EV.
// Modeling it as an array of slabs (rather than a flat percentage) lets a
// state configure e.g. "10% up to 10L, 12% 10-20L, 14% above 20L" without
// any code change.
const RoadTaxSlabSchema = new mongoose.Schema({
  minPrice: { type: Number, required: true, default: 0 },
  // null / omitted maxPrice means "and above"
  maxPrice: { type: Number, default: null },
  ratePercent: { type: Number, required: true, default: 0 },
}, { _id: false });

const StatePricingRuleSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
    trim: true,
  },
  // Uppercase short code, matches Location.stateCode (e.g. "TG", "MH", "DL")
  stateCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },

  // ----- Road Tax (slab based on ex-showroom price, per fuel category) -----
  roadTax: {
    petrolDiesel: { type: [RoadTaxSlabSchema], default: [] },
    ev: { type: [RoadTaxSlabSchema], default: [] },
    cng: { type: [RoadTaxSlabSchema], default: [] },
  },

  // ----- Registration -----
  registration: {
    // Flat RTO registration fee
    flatFee: { type: Number, default: 0 },
    // Smart card / HSRP charges etc.
    additionalCharges: { type: Number, default: 0 },
  },

  // ----- Insurance (1-year comprehensive estimate as % of ex-showroom) -----
  insurance: {
    comprehensiveRatePercent: { type: Number, default: 4 },
    minPremium: { type: Number, default: 8000 },
  },

  // ----- FASTag -----
  // `amount` is the single configurable FASTag charge the business wants
  // reflected in the on-road price (default ₹500, per spec). issuanceFee/
  // minBalance are kept for backward compatibility with the original
  // design and are used as a fallback only if `amount` isn't set.
  fastag: {
    amount: { type: Number, default: 500 },
    issuanceFee: { type: Number, default: 100 },
    minBalance: { type: Number, default: 200 },
  },

  // ----- Handling / dealer logistics charges -----
  // These are STATE-level defaults. A specific city can override either
  // value via Location.handlingChargeOverride / logisticsChargeOverride —
  // see services/pricing/handlingLogisticsService.js for the resolution
  // order (city override > state default here).
  handlingCharges: {
    type: Number,
    default: 10000,
  },
  logisticsCharges: {
    type: Number,
    default: 3000,
  },

  // ----- TCS (Tax Collected at Source) -----
  // Per Income Tax rules, TCS applies only when ex-showroom price exceeds
  // a threshold (currently ₹10 Lakh nationally) — both the threshold and
  // rate are configurable per state/rule so a future change in the law
  // only requires a data update, not a code change.
  tcs: {
    thresholdPrice: { type: Number, default: 1000000 },
    ratePercent: { type: Number, default: 1 },
  },

  // ----- Hypothecation (only charged when the customer finances via loan) -----
  hypothecation: {
    flatFee: { type: Number, default: 1500 },
  },

  // ----- Green Tax (typically applies to vehicles >15yrs or diesel in some
  // states at registration time; kept configurable per state/fuel) -----
  greenTax: {
    applicable: { type: Boolean, default: false },
    flatFee: { type: Number, default: 0 },
    applicableFuelTypes: { type: [String], default: [] }, // e.g. ['Diesel']
  },

  // ----- Luxury Tax (extra slab for high-value cars in some states) -----
  luxuryTax: {
    applicable: { type: Boolean, default: false },
    thresholdPrice: { type: Number, default: 2000000 },
    ratePercent: { type: Number, default: 0 },
  },

  // ----- EV Subsidy (state EV policy incentive, subtracted from total) -----
  evSubsidy: {
    applicable: { type: Boolean, default: false },
    // Flat subsidy amount, capped at maxSubsidy
    amountPerKwh: { type: Number, default: 0 },
    flatSubsidy: { type: Number, default: 0 },
    maxSubsidy: { type: Number, default: 0 },
  },

  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('StatePricingRule', StatePricingRuleSchema);
