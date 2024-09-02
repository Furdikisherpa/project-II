const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to get all bookings
router.get('/booking', (req, res) => {
    bookingController.getBookings((err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching bookings' });
        }
        res.status(200).json(results);
    });
});

// Route to accept a booking
router.post('/booking/accept/:id', (req, res) => {
    const id = req.params.id;
    bookingController.acceptBooking(id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error accepting booking' });
        }
        res.status(200).json({ message: 'Booking accepted' });
    });
});

// Route to reject a booking
router.post('/booking/reject/:id', (req, res) => {
    const id = req.params.id;
    bookingController.rejectBooking(id, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error rejecting booking' });
        }
        res.status(200).json({ message: 'Booking rejected' });
    });
});

module.exports = router;
