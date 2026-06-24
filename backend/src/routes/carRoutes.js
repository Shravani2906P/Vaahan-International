// backend/src/routes/carRoutes.js
/*
================================================================================
File Name : carRoutes.js
Author : Tahseen Raza
Created Date : 2026-06-22
Description : Car routes with all endpoints
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const express = require('express');
const router = express.Router();
const {
  getFullCarHierarchy,
  getAllBrands,
  getBrandById,
  getBrandBySlug,
  getModelsByBrandId,
  getModelsByBrandSlug,
  getModelById,
  getModelBySlug,
  getVariantsByModelId,
  getVariantsByModelSlug,
  getVariantById,
  getTopRatedCars,
  searchCars,
  compareCars,
  getCarsByFuelType,
  getCarsByBodyType,
} = require('../controllers/carController');

// ========================================
// Car Routes
// ========================================

// Get full car hierarchy (Brand → Model → Variant)
router.get('/', getFullCarHierarchy);

// Brand routes
router.get('/brands', getAllBrands);
router.get('/brands/:id', getBrandById);
router.get('/brands/slug/:slug', getBrandBySlug);

// Model routes
router.get('/models', getModelsByBrandId);
router.get('/models/:id', getModelById);
router.get('/models/slug/:slug', getModelBySlug);
router.get('/brands/:brandSlug/models', getModelsByBrandSlug);

// Variant routes
router.get('/variants', getVariantsByModelId);
router.get('/variants/:id', getVariantById);
router.get('/models/:modelSlug/variants', getVariantsByModelSlug);

// Special routes
router.get('/top-rated', getTopRatedCars);
router.get('/search/:query', searchCars);
router.get('/fuel-type/:fuelType', getCarsByFuelType);
router.get('/body-type/:bodyType', getCarsByBodyType);

// Comparison route
router.post('/compare', compareCars);

module.exports = router;