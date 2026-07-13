// backend/src/services/pricing/handlingLogisticsService.js
/*
================================================================================
File Name : handlingLogisticsService.js
Description : Resolves Dealer Handling and Logistics charges. Different
              cities can have different dealer charges even within the
              same state (e.g. a metro vs a tier-2 city) — when the
              resolved Location document for the selected city has an
              override set, it wins; otherwise the state-level default
              from StatePricingRule applies. Nothing here is hardcoded.
================================================================================
*/

/**
 * @param {Object} params
 * @param {Object} params.stateRule - a StatePricingRule document (lean)
 * @param {Object|null} [params.locationDoc] - the resolved Location document
 *   (lean) for the selected city, if one was found. Optional — falls back
 *   to state defaults when not provided (e.g. city wasn't in our seeded
 *   Location collection yet).
 * @returns {{ handlingCharges: number, logisticsCharges: number, source: { handling: string, logistics: string } }}
 */
const resolveHandlingLogistics = ({ stateRule, locationDoc }) => {
  const stateHandling = stateRule?.handlingCharges ?? 0;
  const stateLogistics = stateRule?.logisticsCharges ?? 0;

  const cityHandling = locationDoc?.handlingChargeOverride;
  const cityLogistics = locationDoc?.logisticsChargeOverride;

  const handlingCharges = cityHandling != null ? cityHandling : stateHandling;
  const logisticsCharges = cityLogistics != null ? cityLogistics : stateLogistics;

  return {
    handlingCharges,
    logisticsCharges,
    source: {
      handling: cityHandling != null ? 'city-override' : 'state-default',
      logistics: cityLogistics != null ? 'city-override' : 'state-default',
    },
  };
};

module.exports = { resolveHandlingLogistics };
