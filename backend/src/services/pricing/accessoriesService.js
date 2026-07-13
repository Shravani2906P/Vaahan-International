// backend/src/services/pricing/accessoriesService.js
/*
================================================================================
File Name : accessoriesService.js
Description : Sums the price of whichever accessories the customer
              actually selected. The engine never knows about the full
              catalog — the caller (pricingController) resolves the
              selected AccessoryOption documents and passes them in here,
              keeping this service a pure function with zero DB coupling.
================================================================================
*/

/**
 * @param {Object} params
 * @param {Array<{_id, name, price}>} [params.selectedAccessories] - resolved
 *   AccessoryOption documents (lean) for whatever the customer picked.
 *   Empty/omitted -> ₹0, as required.
 * @returns {{ amount: number, items: Array<{ id: string, name: string, price: number }> }}
 */
const calculateAccessories = ({ selectedAccessories }) => {
  const accessories = selectedAccessories || [];

  const items = accessories.map((a) => ({
    id: String(a._id),
    name: a.name,
    price: a.price || 0,
  }));

  const amount = items.reduce((sum, item) => sum + item.price, 0);

  return { amount, items };
};

module.exports = { calculateAccessories };
