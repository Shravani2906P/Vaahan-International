// backend/src/services/pricing/luxuryTaxService.js
/*
================================================================================
File Name : luxuryTaxService.js
Description : Applies a state's extra luxury tax slab for high-value
              vehicles, when the state has one configured.
================================================================================
*/

/**
 * @param {Object} params
 * @param {number} params.exShowroomPrice
 * @param {Object} params.stateRule - a StatePricingRule document (lean)
 * @returns {{ amount: number, applicable: boolean, ratePercent: number }}
 */
const calculateLuxuryTax = ({ exShowroomPrice, stateRule }) => {
  const rule = stateRule?.luxuryTax;
  if (!rule || !rule.applicable) {
    return { amount: 0, applicable: false, ratePercent: 0 };
  }

  if (exShowroomPrice < (rule.thresholdPrice ?? Infinity)) {
    return { amount: 0, applicable: false, ratePercent: 0 };
  }

  const amount = Math.round((exShowroomPrice * rule.ratePercent) / 100);
  return { amount, applicable: true, ratePercent: rule.ratePercent };
};

module.exports = { calculateLuxuryTax };
