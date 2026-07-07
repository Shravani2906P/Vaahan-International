const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingController');
const { protect, admin } = require('../middleware/auth');

// Public settings retrieval
router.get('/', getSettings);

// Protected admin settings update
router.put('/', protect, admin, updateSettings);

module.exports = router;
