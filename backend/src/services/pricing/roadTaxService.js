// backend/src/services/pricing/roadTaxService.js
/*
================================================================================
File Name : roadTaxService.js
Description : Computes road tax from a state's configured slabs. No tax
              rate is hardcoded here — every number comes from the
              StatePricingRule document passed in.
================================================================================
*/

/**
 * Pick the fuel-category slab list a given fuelType should use.
 */
const getSlabsForFuelType = (roadTaxRules, fuelType) => {
  if (!roadTaxRules) return [];
  const normalized = String(fuelType || '').toLowerCase();

  if (normalized === 'electric') return roadTaxRules.ev || [];
  if (normalized === 'cng') return roadTaxRules.cng || [];
  // Petrol, Diesel, Hybrid, N/A, and anything else fall back to the
  // standard petrol/diesel slab — states that want to differentiate
  // Hybrid can add a dedicated slab list later without touching this code.
  return roadTaxRules.petrolDiesel || [];
};

/**
 * Find the slab whose [minPrice, maxPrice) range contains exShowroomPrice.
 * If no slab matches (e.g. an empty/misconfigured state), returns null.
 */
const findMatchingSlab = (slabs, exShowroomPrice) => {
  if (!Array.isArray(slabs) || slabs.length === 0) return null;

  return (
    slabs.find((slab) => {
      const aboveMin = exShowroomPrice >= (slab.minPrice ?? 0);
      const belowMax = slab.maxPrice == null || exShowroomPrice < slab.maxPrice;
      return aboveMin && belowMax;
    }) || null
  );
};

/**
 * Calculate road tax.
 * @param {Object} params
 * @param {number} params.exShowroomPrice
 * @param {string} params.fuelType
 * @param {Object} params.stateRule - a StatePricingRule document (lean)
 * @returns {{ amount: number, ratePercent: number, slabUsed: Object|null }}
 */
const calculateRoadTax = ({ exShowroomPrice, fuelType, stateRule }) => {
  const slabs = getSlabsForFuelType(stateRule?.roadTax, fuelType);
  const slab = findMatchingSlab(slabs, exShowroomPrice);

  if (!slab) {
    return { amount: 0, ratePercent: 0, slabUsed: null };
  }

  const amount = Math.round((exShowroomPrice * slab.ratePercent) / 100);
  return { amount, ratePercent: slab.ratePercent, slabUsed: slab };
};

module.exports = { calculateRoadTax, getSlabsForFuelType, findMatchingSlab };
