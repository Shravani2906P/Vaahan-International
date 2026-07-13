// backend/src/services/pricing/evSubsidyService.js
/*
================================================================================
File Name : evSubsidyService.js
Description : Computes the state EV purchase subsidy (if the state has an
              active EV policy configured), capped at maxSubsidy. Only
              applies to Electric fuel type.
================================================================================
*/

/**
 * @param {Object} params
 * @param {string} params.fuelType
 * @param {number} [params.batteryCapacityKwh] - optional, for per-kWh schemes
 * @param {Object} params.stateRule - a StatePricingRule document (lean)
 * @returns {{ amount: number, applicable: boolean }}
 */
const calculateEvSubsidy = ({ fuelType, batteryCapacityKwh, stateRule }) => {
  const rule = stateRule?.evSubsidy;
  const isElectric = String(fuelType || '').toLowerCase() === 'electric';

  if (!rule || !rule.applicable || !isElectric) {
    return { amount: 0, applicable: false };
  }

  const perKwhAmount =
    batteryCapacityKwh && rule.amountPerKwh
      ? batteryCapacityKwh * rule.amountPerKwh
      : 0;

  const rawAmount = (rule.flatSubsidy || 0) + perKwhAmount;
  const maxSubsidy = rule.maxSubsidy || Infinity;
  const amount = Math.min(rawAmount, maxSubsidy);

  return { amount: Math.round(amount), applicable: amount > 0 };
};

module.exports = { calculateEvSubsidy };
