const express = require('express');
const router = express.Router();
const { bookSlot, getAllBookings, getAllBookingsForAdmin } = require('../controllers/bookingController');
const { protect, isAdmin } = require('../middleware/auth');

router.post('/booking', protect, bookSlot);
router.get('/allbookings', protect, getAllBookings);
router.get('/admin/allbookings', protect, isAdmin, getAllBookingsForAdmin);

module.exports = router;
