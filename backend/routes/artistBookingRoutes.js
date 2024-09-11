const express = require('express');
const router = express.Router();
const { getBooking, acceptBooking, rejectBooking } = require('../controllers/artistBookingController');
const { verifyToken, checkArtistRole } = require('../middleware/artistBookingMiddleware');

// Route to get all bookings for an artist
router.get('/bookings', verifyToken, checkArtistRole, getBooking);

// Route to accept a booking by its ID
router.put('/bookings/:bookingID/accept', verifyToken, checkArtistRole, acceptBooking);

// Route to reject a booking by its ID
router.put('/bookings/:bookingID/reject', verifyToken, checkArtistRole, rejectBooking);

module.exports = router;
