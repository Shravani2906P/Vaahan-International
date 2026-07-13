// backend/src/services/pricing/hypothecationService.js
/*
================================================================================
File Name : hypothecationService.js
Description : Hypothecation (bank/NBFC lien registration on the vehicle's
              RC) is only charged when the customer is financing the
              purchase via a loan. The flat fee is configurable per state
              rather than hardcoded.
================================================================================
*/

/**
 * @param {Object} params
 * @param {boolean} params.loanRequired - whether the customer selected financing
 * @param {Object} params.stateRule - a StatePricingRule document (lean)
 * @returns {{ amount: number, applicable: boolean }}
 */
const calculateHypothecation = ({ loanRequired, stateRule }) => {
  if (!loanRequired) {
    return { amount: 0, applicable: false };
  }

  const flatFee = stateRule?.hypothecation?.flatFee ?? 1500;
  return { amount: flatFee, applicable: true };
};

module.exports = { calculateHypothecation };
