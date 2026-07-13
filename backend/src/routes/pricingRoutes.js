// backend/src/routes/pricingRoutes.js
const express = require('express');
const router = express.Router();
const {
  getOnRoadPrice,
  getOnRoadPriceBulk,
  getAccessories,
} = require('../controllers/pricingController');

// IMPORTANT: /accessories must be registered before the '/' GET handler's
// implicit variantId requirement would otherwise never conflict (this is
// a distinct path), but keeping it above for readability/route-order
// clarity as the route list grows.
router.get('/accessories', getAccessories);
router.get('/', getOnRoadPrice);
router.post('/bulk', getOnRoadPriceBulk);

module.exports = router;
