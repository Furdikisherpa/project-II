const db = require('../config/dbConnection');

const getBookings = async (req, res) => {
    const artistId = req.artistId; // Extract artistId from req object
    console.log('Received artistId:', artistId);

    if (!artistId) {
        return res.status(401).json({ message: 'Unauthorized access: No valid artist ID found' });
    }

    const query = `
        SELECT 
            booking.BookingID, 
            booking.BookingDate, 
            booking.EventDate, 
            booking.EventTime, 
            booking.Status, 
            booking.TotalPrice, 
            user.id AS UserID, 
            user.Username AS UserName
        FROM booking
        JOIN user ON booking.UserID = user.id
        WHERE booking.ArtistID = ?
    `;

    db.query(query, [artistId], (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ error: 'Failed to fetch bookings' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No bookings found for this artist' });
        }
        res.json(results);
    });
};



// Accept a booking
const acceptBooking = (req, res) => {
    const artistId = req.artistId;
    const bookingID = req.params.bookingID;

    if (!artistId) {
        return res.status(401).json({ message: 'Unauthorized access: No valid artist ID found' });
    }

    const query = 'UPDATE booking SET Status = ? WHERE BookingID = ? AND ArtistID = ?';
    db.query(query, ['accepted', bookingID, artistId], (err, results) => {
        if (err) {
            console.error('Error accepting booking:', err);
            return res.status(500).json({ error: 'Failed to accept booking' });
        }
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Booking or artist not found' });
        res.json({ message: 'Booking accepted' });
    });
};

// Reject a booking
const rejectBooking = (req, res) => {
    const artistId = req.artistId;
    const bookingID = req.params.bookingID;

    if (!artistId) {
        return res.status(401).json({ message: 'Unauthorized access: No valid artist ID found' });
    }

    const query = 'UPDATE booking SET Status = ? WHERE BookingID = ? AND ArtistID = ?';
    db.query(query, ['rejected', bookingID, artistId], (err, results) => {
        if (err) {
            console.error('Error rejecting booking:', err);
            return res.status(500).json({ error: 'Failed to reject booking' });
        }
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Booking or artist not found' });
        res.json({ message: 'Booking rejected' });
    });
};

module.exports = {
    getBookings,
    acceptBooking,
    rejectBooking
};
