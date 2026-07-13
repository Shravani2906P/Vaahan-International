// backend/src/services/pricing/registrationService.js
/*
================================================================================
File Name : registrationService.js
Description : Computes RTO registration charges from state-configured fees.
================================================================================
*/

/**
 * @param {Object} params
 * @param {Object} params.stateRule - a StatePricingRule document (lean)
 * @returns {{ amount: number, flatFee: number, additionalCharges: number }}
 */
const calculateRegistration = ({ stateRule }) => {
  const flatFee = stateRule?.registration?.flatFee ?? 0;
  const additionalCharges = stateRule?.registration?.additionalCharges ?? 0;

  return {
    amount: flatFee + additionalCharges,
    flatFee,
    additionalCharges,
  };
};

module.exports = { calculateRegistration };
