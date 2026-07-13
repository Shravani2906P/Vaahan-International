// backend/src/routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const {
  getCurrentLocation,
  searchLocations,
  getLocationById,
} = require('../controllers/locationController');

router.get('/current', getCurrentLocation);
router.get('/search', searchLocations);
router.get('/:id', getLocationById);

module.exports = router;
