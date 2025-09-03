const express = require('express');
const router = express.Router();
const { getAvailableSlots } = require('../controllers/slotController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getAvailableSlots); // Only logged-in users can see slots

module.exports = router;
