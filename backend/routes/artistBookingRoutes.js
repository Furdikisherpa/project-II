const express = require('express');
const router = express.Router();
const artistBookingController = require('../controllers/artistBookingController'); // Ensure path is correct
const artistBookingMiddleware = require('../middleware/artistBookingMiddleware');

// Route to get bookings for an artist
router.get('/bookings', artistBookingMiddleware, artistBookingController.getBooking);

// Route to accept a booking
router.put('/bookings/:bookingID/accept', artistBookingMiddleware,  artistBookingController.acceptBooking);

// Route to reject a booking
router.put('/bookings/:bookingID/reject', artistBookingMiddleware, artistBookingController.rejectBooking);

module.exports = router;
