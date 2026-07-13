// backend/src/scripts/seedStatePricingRules.js
/*
================================================================================
File Name : seedStatePricingRules.js
Description : One-time (idempotent) seed for StatePricingRule — every
              Indian state and union territory, each with its own
              configurable road tax slabs, registration fee, insurance
              rate, FASTag charge, handling charge, and optional green /
              luxury tax / EV subsidy rules.

              IMPORTANT: The numbers below are reasonable, structurally
              correct starting points modeled on how Indian RTOs actually
              slab road tax (by ex-showroom price, with EVs typically
              exempted). They are NOT a substitute for each state's
              current official notification — an admin should review and
              adjust each document (via this script or directly in
              StatePricingRules) before relying on it for real quotes.
              That's the whole point of storing this in the database
              instead of in code: one edit here reprices every vehicle in
              that state instantly, no deploy required.

Run:  node backend/src/scripts/seedStatePricingRules.js
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const StatePricingRule = require('../models/StatePricingRule');

// Standard petrol/diesel road-tax slab shape reused by most states, with a
// per-state multiplier applied so we're not hand-writing 36 slab arrays.
const standardSlabs = (baseLowRate, baseMidRate, baseHighRate) => [
  { minPrice: 0, maxPrice: 1000000, ratePercent: baseLowRate },
  { minPrice: 1000000, maxPrice: 2000000, ratePercent: baseMidRate },
  { minPrice: 2000000, maxPrice: null, ratePercent: baseHighRate },
];

const evExemptSlab = [{ minPrice: 0, maxPrice: null, ratePercent: 0 }];
const cngSlab = (rate) => [{ minPrice: 0, maxPrice: null, ratePercent: rate }];

const STATES = [
  { state: 'Andhra Pradesh', stateCode: 'AP', low: 12, mid: 14, high: 16 },
  { state: 'Arunachal Pradesh', stateCode: 'AR', low: 6, mid: 8, high: 10 },
  { state: 'Assam', stateCode: 'AS', low: 6, mid: 8, high: 10 },
  { state: 'Bihar', stateCode: 'BR', low: 9, mid: 10, high: 12 },
  { state: 'Chhattisgarh', stateCode: 'CG', low: 6, mid: 7, high: 8, luxury: true },
  { state: 'Goa', stateCode: 'GA', low: 9, mid: 11, high: 12 },
  { state: 'Gujarat', stateCode: 'GJ', low: 6, mid: 8, high: 10 },
  { state: 'Haryana', stateCode: 'HR', low: 6, mid: 8, high: 10, luxury: true },
  { state: 'Himachal Pradesh', stateCode: 'HP', low: 7, mid: 9, high: 10 },
  { state: 'Jharkhand', stateCode: 'JH', low: 6, mid: 8, high: 9 },
  { state: 'Karnataka', stateCode: 'KA', low: 13, mid: 14, high: 18, luxury: true },
  { state: 'Kerala', stateCode: 'KL', low: 9, mid: 15, high: 21, luxury: true },
  { state: 'Madhya Pradesh', stateCode: 'MP', low: 8, mid: 10, high: 12 },
  { state: 'Maharashtra', stateCode: 'MH', low: 11, mid: 12, high: 13, luxury: true },
  { state: 'Manipur', stateCode: 'MN', low: 6, mid: 7, high: 8 },
  { state: 'Meghalaya', stateCode: 'ML', low: 6, mid: 7, high: 8 },
  { state: 'Mizoram', stateCode: 'MZ', low: 6, mid: 7, high: 8 },
  { state: 'Nagaland', stateCode: 'NL', low: 6, mid: 7, high: 8 },
  { state: 'Odisha', stateCode: 'OR', low: 6, mid: 8, high: 10 },
  { state: 'Punjab', stateCode: 'PB', low: 9, mid: 10, high: 11 },
  { state: 'Rajasthan', stateCode: 'RJ', low: 8, mid: 10, high: 12 },
  { state: 'Sikkim', stateCode: 'SK', low: 6, mid: 7, high: 8 },
  { state: 'Tamil Nadu', stateCode: 'TN', low: 12, mid: 15, high: 18, luxury: true },
  { state: 'Telangana', stateCode: 'TG', low: 12, mid: 14, high: 17, luxury: true },
  { state: 'Tripura', stateCode: 'TR', low: 6, mid: 7, high: 8 },
  { state: 'Uttar Pradesh', stateCode: 'UP', low: 8, mid: 10, high: 12 },
  { state: 'Uttarakhand', stateCode: 'UK', low: 8, mid: 9, high: 10 },
  { state: 'West Bengal', stateCode: 'WB', low: 8, mid: 9, high: 10 },
  { state: 'Andaman and Nicobar Islands', stateCode: 'AN', low: 6, mid: 6, high: 6 },
  { state: 'Chandigarh', stateCode: 'CH', low: 6, mid: 8, high: 9 },
  { state: 'Dadra and Nagar Haveli and Daman and Diu', stateCode: 'DH', low: 6, mid: 6, high: 6 },
  { state: 'Delhi', stateCode: 'DL', low: 4, mid: 7, high: 10, luxury: true },
  { state: 'Jammu and Kashmir', stateCode: 'JK', low: 8, mid: 9, high: 10 },
  { state: 'Ladakh', stateCode: 'LA', low: 6, mid: 6, high: 6 },
  { state: 'Lakshadweep', stateCode: 'LD', low: 4, mid: 4, high: 4 },
  { state: 'Puducherry', stateCode: 'PY', low: 8, mid: 9, high: 10 },
];

const buildRuleDoc = ({ state, stateCode, low, mid, high, luxury }) => ({
  state,
  stateCode,
  roadTax: {
    petrolDiesel: standardSlabs(low, mid, high),
    ev: evExemptSlab, // Most states currently exempt EVs from road tax
    cng: cngSlab(Math.max(low - 4, 0)), // CNG typically taxed lower than petrol/diesel
  },
  registration: {
    flatFee: 5000,
    additionalCharges: 1500, // smart card / HSRP etc.
  },
  insurance: {
    comprehensiveRatePercent: 4,
    minPremium: 8000,
  },
  fastag: {
    amount: 500, // single configurable FASTag charge, per business spec
    issuanceFee: 100,
    minBalance: 200,
  },
  handlingCharges: 10000,
  logisticsCharges: 3000,
  tcs: {
    thresholdPrice: 1000000, // ₹10 Lakh — current national TCS threshold
    ratePercent: 1,
  },
  hypothecation: {
    flatFee: 1500,
  },
  greenTax: {
    applicable: false,
    flatFee: 0,
    applicableFuelTypes: [],
  },
  luxuryTax: {
    applicable: !!luxury,
    thresholdPrice: 2000000,
    ratePercent: luxury ? 2 : 0,
  },
  evSubsidy: {
    applicable: true,
    amountPerKwh: 0,
    flatSubsidy: 100000,
    maxSubsidy: 150000,
  },
  isActive: true,
});

const seedStatePricingRules = async () => {
  try {
    await connectDB();

    let created = 0;
    let updated = 0;

    for (const stateConfig of STATES) {
      const doc = buildRuleDoc(stateConfig);
      const result = await StatePricingRule.findOneAndUpdate(
        { stateCode: doc.stateCode },
        doc,
        { upsert: true, new: true, rawResult: true }
      );
      if (result.lastErrorObject?.updatedExisting) {
        updated++;
      } else {
        created++;
      }
    }

    console.log(`✅ StatePricingRule seed complete — ${created} created, ${updated} updated (${STATES.length} total).`);
    process.exit(0);
  } catch (error) {
    console.error('❌ StatePricingRule seed failed:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedStatePricingRules();
}

module.exports = { seedStatePricingRules, STATES };
