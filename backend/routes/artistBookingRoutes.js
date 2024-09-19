const express = require('express');
const router = express.Router();
const artistBookingController = require('../controllers/artistBookingController');
const artistAuthMiddleware = require('../middleware/artistAuthMiddleware');

// Fetch artist bookings
router.get('/bookings/:artistId', artistAuthMiddleware, artistBookingController.getBookings);

// Accept a booking
router.put('/bookings/:bookingID/accept', artistAuthMiddleware, artistBookingController.acceptBooking);

// Reject a booking
router.put('/bookings/:bookingID/reject', artistAuthMiddleware, artistBookingController.rejectBooking);

module.exports = router;
