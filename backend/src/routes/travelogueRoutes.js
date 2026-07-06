// backend/src/routes/travelogueRoutes.js
/*
================================================================================
File Name : travelogueRoutes.js
Author : Tahseen Raza
Created Date : 2026-06-29
Description : Travelogue routes for travel stories
Company : Vaahan International
Copyright : (c) 2026 Vaahan International. All rights reserved.
================================================================================
*/

const express = require('express');
const router = express.Router();
const {
  getAllTravelogues,
  getTravelogueBySlug,
  getTraveloguesByCategory,
  getFeaturedTravelogues,
  createTravelogue,
  updateTravelogue,
  deleteTravelogue,
} = require('../controllers/travelogueController');

const { protect, admin } = require('../middleware/auth');

// ========================================
// IMPORTANT: Specific routes FIRST, then dynamic routes
// ========================================

// Get featured travelogues (limit 4) - SPECIFIC ROUTE FIRST
router.get('/featured', getFeaturedTravelogues);

// Get travelogues by category
router.get('/category/:category', getTraveloguesByCategory);

// Get all published travelogues
router.get('/', getAllTravelogues);

// Create a new travelogue (protected with Admin role validation)
router.post('/', protect, admin, createTravelogue);

// Update an existing travelogue (protected with Admin role validation)
router.put('/:id', protect, admin, updateTravelogue);

// Delete a travelogue (protected with Admin role validation)
router.delete('/:id', protect, admin, deleteTravelogue);

// Get travelogue by slug - DYNAMIC ROUTE LAST
router.get('/:slug', getTravelogueBySlug);

module.exports = router;