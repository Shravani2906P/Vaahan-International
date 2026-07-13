// backend/src/services/pricing/calculator.js
/*
================================================================================
File Name : calculator.js
Description : Single entry point for the entire pricing engine.
              calculateOnRoadPrice() is the ONLY function the rest of the
              app should call — it composes all the individual tax/fee
              services and returns a full breakdown plus the final price.

              This module is intentionally the sole place that knows about
              all the sub-services; it has zero knowledge of Mongoose
              models beyond receiving plain, pre-resolved objects
              (`stateRule`, optionally `locationDoc`, `selectedAccessories`)
              from the caller, which keeps the pricing engine independent
              from the vehicle database (SOLID: Dependency Inversion).

              Formula (per business requirement):
                On-Road Price =
                  Ex-Showroom Price
                  + GST (display only — already included in Ex-Showroom)
                  + RTO / Road Tax (state + fuel + price-slab dependent;
                    combines road tax and RTO registration, both already
                    computed by their own existing services, into the one
                    "RTO / Road Tax" line the business asked for)
                  + TCS (only if Ex-Showroom > configurable threshold)
                  + First-Year Insurance (dynamic, state-configurable rate)
                  + FASTag (fixed/configurable)
                  + Hypothecation (only if loanRequired)
                  + Dealer Handling + Logistics (state default, or a
                    city-level override when the caller resolved one)
                  + Accessories (only whatever the caller says was selected)

              Green Tax / Luxury Tax / EV Subsidy are pre-existing,
              already-applicable-in-some-states charges from before this
              formula was specified. They're kept (not removed — per "Do
              NOT remove existing features") and only ever apply when a
              state's rule actually turns them on, appearing as clearly
              separated "additional" line items after the core formula.
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const { calculateRoadTax } = require('./roadTaxService');
const { calculateRegistration } = require('./registrationService');
const { calculateInsurance } = require('./insuranceService');
const { calculateGreenTax } = require('./greenTaxService');
const { calculateLuxuryTax } = require('./luxuryTaxService');
const { calculateEvSubsidy } = require('./evSubsidyService');
const { calculateTCS } = require('./tcsService');
const { calculateHypothecation } = require('./hypothecationService');
const { resolveHandlingLogistics } = require('./handlingLogisticsService');
const { calculateAccessories } = require('./accessoriesService');

/**
 * @param {Object} params
 * @param {number} params.exShowroomPrice - required
 * @param {string} params.fuelType - 'Petrol' | 'Diesel' | 'Electric' | 'CNG' | 'Hybrid' ...
 * @param {string} [params.vehicleType] - reserved for future 2W/4W/commercial differentiation
 * @param {string} params.city
 * @param {string} params.state
 * @param {Object} params.stateRule - a StatePricingRule document (lean), resolved by the caller
 * @param {number} [params.batteryCapacityKwh] - optional, for EV subsidy schemes
 * @param {Object|null} [params.locationDoc] - resolved Location document (lean)
 *   for the selected city, used only for its optional handling/logistics
 *   overrides. Omit if not available — state defaults apply.
 * @param {boolean} [params.loanRequired] - customer is financing via loan
 * @param {Array<{_id, name, price}>} [params.selectedAccessories] - resolved
 *   AccessoryOption documents for whatever the customer picked
 *
 * @returns {{
 *   exShowroomPrice: number,
 *   exShowroom: number,
 *   city: string,
 *   state: string,
 *   gstIncluded: true,
 *   roadTax: number,
 *   roadTaxRatePercent: number,
 *   registration: number,
 *   tcs: number,
 *   tcsApplicable: boolean,
 *   insurance: number,
 *   fastag: number,
 *   hypothecation: number,
 *   handlingCharges: number,
 *   logisticsCharges: number,
 *   accessories: number,
 *   accessoryItems: Array<{ id: string, name: string, price: number }>,
 *   greenTax: number,
 *   luxuryTax: number,
 *   evSubsidy: number,
 *   totalOtherCharges: number,
 *   totalOnRoadPrice: number,
 *   onRoadPrice: number,
 *   breakdown: Array<{ label: string, amount: number }>
 * }}
 */
const calculateOnRoadPrice = ({
  exShowroomPrice,
  fuelType,
  vehicleType = 'car',
  city,
  state,
  stateRule,
  batteryCapacityKwh,
  locationDoc = null,
  loanRequired = false,
  selectedAccessories = [],
}) => {
  if (!exShowroomPrice || exShowroomPrice <= 0) {
    throw new Error('A valid exShowroomPrice is required to calculate on-road price');
  }
  if (!stateRule) {
    throw new Error('A resolved StatePricingRule is required to calculate on-road price');
  }

  // ----- RTO / Road Tax (state + fuel + ex-showroom price slab) -----
  // The business's formula has one "RTO / Road Tax" line. We still reuse
  // the existing roadTaxService (slab lookup) and registrationService
  // (flat RTO fee) exactly as before — just combined into one total here,
  // as the formula requires — rather than duplicating that logic.
  const roadTax = calculateRoadTax({ exShowroomPrice, fuelType, stateRule });
  const registration = calculateRegistration({ stateRule });
  const rtoRoadTaxAmount = roadTax.amount + registration.amount;

  // ----- TCS -----
  const tcs = calculateTCS({ exShowroomPrice, stateRule });

  // ----- First-Year Insurance (dynamic, unchanged service) -----
  const insurance = calculateInsurance({ exShowroomPrice, stateRule });

  // ----- FASTag (single configurable amount, default ₹500) -----
  const fastagAmount =
    stateRule.fastag?.amount ??
    (stateRule.fastag?.issuanceFee ?? 0) + (stateRule.fastag?.minBalance ?? 0);

  // ----- Hypothecation (only if financing via loan) -----
  const hypothecation = calculateHypothecation({ loanRequired, stateRule });

  // ----- Dealer Handling + Logistics (city override > state default) -----
  const { handlingCharges, logisticsCharges } = resolveHandlingLogistics({
    stateRule,
    locationDoc,
  });

  // ----- Accessories (only whatever was actually selected) -----
  const accessories = calculateAccessories({ selectedAccessories });

  // ----- Pre-existing, state-conditional extras (kept, not removed) -----
  const greenTax = calculateGreenTax({ fuelType, stateRule });
  const luxuryTax = calculateLuxuryTax({ exShowroomPrice, stateRule });
  const evSubsidy = calculateEvSubsidy({ fuelType, batteryCapacityKwh, stateRule });

  const totalOtherCharges =
    rtoRoadTaxAmount +
    tcs.amount +
    insurance.amount +
    fastagAmount +
    hypothecation.amount +
    handlingCharges +
    logisticsCharges +
    accessories.amount +
    greenTax.amount +
    luxuryTax.amount -
    evSubsidy.amount;

  const totalOnRoadPrice = Math.round(exShowroomPrice + totalOtherCharges);

  const breakdown = [
    { label: 'Ex-Showroom Price', amount: exShowroomPrice },
    { label: 'GST Included', amount: 0 },
    { label: 'RTO / Road Tax', amount: rtoRoadTaxAmount },
  ];
  if (tcs.applicable) {
    breakdown.push({ label: 'TCS', amount: tcs.amount });
  }
  breakdown.push(
    { label: 'Insurance (1-Year Comprehensive)', amount: insurance.amount },
    { label: 'FASTag', amount: fastagAmount },
  );
  if (hypothecation.applicable) {
    breakdown.push({ label: 'Hypothecation Charge', amount: hypothecation.amount });
  }
  breakdown.push(
    { label: 'Dealer Handling Charge', amount: handlingCharges },
    { label: 'Logistics Charge', amount: logisticsCharges },
  );
  if (accessories.amount > 0) {
    breakdown.push({ label: 'Accessories', amount: accessories.amount });
  }
  if (greenTax.applicable) {
    breakdown.push({ label: 'Green Tax', amount: greenTax.amount });
  }
  if (luxuryTax.applicable) {
    breakdown.push({ label: 'Luxury Tax', amount: luxuryTax.amount });
  }
  if (evSubsidy.applicable) {
    breakdown.push({ label: 'EV Subsidy', amount: -evSubsidy.amount });
  }
  breakdown.push({ label: 'On-Road Price', amount: totalOnRoadPrice });

  return {
    // Spec-mandated field names
    exShowroom: exShowroomPrice,
    gstIncluded: true,
    tcs: tcs.amount,
    tcsApplicable: tcs.applicable,
    hypothecation: hypothecation.amount,
    logisticsCharges,
    accessories: accessories.amount,
    accessoryItems: accessories.items,
    totalOnRoadPrice,

    // Existing field names, preserved so nothing already built against
    // this engine (Compare Cars, ComparisonResults, OnRoadPriceDisplay)
    // breaks — onRoadPrice/exShowroomPrice remain the values everything
    // else already reads.
    exShowroomPrice,
    city,
    state,
    fuelType,
    vehicleType,
    roadTax: rtoRoadTaxAmount,
    roadTaxRatePercent: roadTax.ratePercent,
    registration: registration.amount,
    insurance: insurance.amount,
    fastag: fastagAmount,
    handlingCharges,
    greenTax: greenTax.amount,
    luxuryTax: luxuryTax.amount,
    evSubsidy: evSubsidy.amount,
    totalOtherCharges: Math.round(totalOtherCharges),
    onRoadPrice: totalOnRoadPrice,
    breakdown,
  };
};

module.exports = { calculateOnRoadPrice };
