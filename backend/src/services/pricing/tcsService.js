// backend/src/services/pricing/tcsService.js
/*
================================================================================
File Name : tcsService.js
Description : Tax Collected at Source. Per Income Tax rules, this applies
              only when the ex-showroom price exceeds a threshold
              (nationally ₹10 Lakh at time of writing). Both the threshold
              and rate are configurable per state/rule — never hardcoded —
              so a future change in the law is a data update, not a code
              change.
================================================================================
*/

/**
 * @param {Object} params
 * @param {number} params.exShowroomPrice
 * @param {Object} params.stateRule - a StatePricingRule document (lean)
 * @returns {{ amount: number, applicable: boolean, thresholdPrice: number, ratePercent: number }}
 */
const calculateTCS = ({ exShowroomPrice, stateRule }) => {
  const thresholdPrice = stateRule?.tcs?.thresholdPrice ?? 1000000;
  const ratePercent = stateRule?.tcs?.ratePercent ?? 1;

  if (!exShowroomPrice || exShowroomPrice <= thresholdPrice) {
    return { amount: 0, applicable: false, thresholdPrice, ratePercent };
  }

  const amount = Math.round((exShowroomPrice * ratePercent) / 100);
  return { amount, applicable: true, thresholdPrice, ratePercent };
};

module.exports = { calculateTCS };
