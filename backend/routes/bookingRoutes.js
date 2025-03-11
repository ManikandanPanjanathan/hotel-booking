const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.createBooking);
router.get('/:userId', bookingController.getUserBookings);
router.post('/checkin/:bookingId', bookingController.checkIn);

module.exports = router;