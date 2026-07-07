const express = require('express');
const router = express.Router();
const { createLead, getAllLeads } = require('../controllers/leadController');
const { protect, admin } = require('../middleware/auth');

// Public lead submission
router.post('/', createLead);

// Protected admin lead retrieval
router.get('/', protect, admin, getAllLeads);

module.exports = router;
