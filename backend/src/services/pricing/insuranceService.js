// backend/src/services/pricing/insuranceService.js
/*
================================================================================
File Name : insuranceService.js
Description : Estimates 1-year comprehensive insurance premium as a
              percentage of ex-showroom price, with a state-configurable
              minimum premium floor.
================================================================================
*/

/**
 * @param {Object} params
 * @param {number} params.exShowroomPrice
 * @param {Object} params.stateRule - a StatePricingRule document (lean)
 * @returns {{ amount: number, ratePercent: number }}
 */
const calculateInsurance = ({ exShowroomPrice, stateRule }) => {
  const ratePercent = stateRule?.insurance?.comprehensiveRatePercent ?? 4;
  const minPremium = stateRule?.insurance?.minPremium ?? 8000;

  const estimated = Math.round((exShowroomPrice * ratePercent) / 100);
  const amount = Math.max(estimated, minPremium);

  return { amount, ratePercent };
};

module.exports = { calculateInsurance };
