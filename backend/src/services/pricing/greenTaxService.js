// backend/src/services/pricing/greenTaxService.js
/*
================================================================================
File Name : greenTaxService.js
Description : Applies a state's green tax, when applicable, for the given
              fuel type. Green tax is normally a re-registration-time levy
              on older vehicles, but some states also apply a flat amount
              to specific fuel types at first registration — kept fully
              configurable per state rather than assumed.
================================================================================
*/

/**
 * @param {Object} params
 * @param {string} params.fuelType
 * @param {Object} params.stateRule - a StatePricingRule document (lean)
 * @returns {{ amount: number, applicable: boolean }}
 */
const calculateGreenTax = ({ fuelType, stateRule }) => {
  const rule = stateRule?.greenTax;
  if (!rule || !rule.applicable) {
    return { amount: 0, applicable: false };
  }

  const applicableFuelTypes = (rule.applicableFuelTypes || []).map((f) =>
    String(f).toLowerCase()
  );

  // Empty applicableFuelTypes list means "applies to all fuel types".
  const matchesFuel =
    applicableFuelTypes.length === 0 ||
    applicableFuelTypes.includes(String(fuelType || '').toLowerCase());

  if (!matchesFuel) {
    return { amount: 0, applicable: false };
  }

  return { amount: rule.flatFee || 0, applicable: true };
};

module.exports = { calculateGreenTax };
