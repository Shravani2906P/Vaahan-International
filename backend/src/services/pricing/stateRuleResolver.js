// backend/src/services/pricing/stateRuleResolver.js
/*
================================================================================
File Name : stateRuleResolver.js
Description : Resolves a StatePricingRule document for a given state name
              or stateCode. Keeps the "how do we find the right rule"
              logic in one place so pricingController and compareController
              don't duplicate it.
================================================================================
*/

const StatePricingRule = require('../../models/StatePricingRule');

// A conservative national-average fallback used only if a state genuinely
// has no configured rule yet — keeps /api/pricing from ever 500ing just
// because StatePricingRules hasn't been seeded for a new state, while
// making it obvious (via `isFallback: true`) that the number is a rough
// estimate rather than that state's real rule.
const FALLBACK_RULE = {
  state: 'India (National Average)',
  stateCode: 'IN',
  roadTax: {
    petrolDiesel: [
      { minPrice: 0, maxPrice: 1000000, ratePercent: 10 },
      { minPrice: 1000000, maxPrice: 2000000, ratePercent: 12 },
      { minPrice: 2000000, maxPrice: null, ratePercent: 14 },
    ],
    ev: [{ minPrice: 0, maxPrice: null, ratePercent: 0 }],
    cng: [{ minPrice: 0, maxPrice: null, ratePercent: 8 }],
  },
  registration: { flatFee: 5000, additionalCharges: 1500 },
  insurance: { comprehensiveRatePercent: 4, minPremium: 8000 },
  fastag: { issuanceFee: 100, minBalance: 200 },
  handlingCharges: 10000,
  greenTax: { applicable: false, flatFee: 0, applicableFuelTypes: [] },
  luxuryTax: { applicable: false, thresholdPrice: 2000000, ratePercent: 0 },
  evSubsidy: { applicable: false, amountPerKwh: 0, flatSubsidy: 0, maxSubsidy: 0 },
};

/**
 * @param {Object} params
 * @param {string} [params.state] - full state name, e.g. "Telangana"
 * @param {string} [params.stateCode] - short code, e.g. "TG"
 * @returns {Promise<{ rule: Object, isFallback: boolean }>}
 */
const resolveStateRule = async ({ state, stateCode }) => {
  let rule = null;

  if (stateCode) {
    rule = await StatePricingRule.findOne({
      stateCode: String(stateCode).toUpperCase(),
      isActive: true,
    }).lean();
  }

  if (!rule && state) {
    rule = await StatePricingRule.findOne({
      state: new RegExp(`^${state}$`, 'i'),
      isActive: true,
    }).lean();
  }

  if (!rule) {
    return { rule: FALLBACK_RULE, isFallback: true };
  }

  return { rule, isFallback: false };
};

module.exports = { resolveStateRule, FALLBACK_RULE };
