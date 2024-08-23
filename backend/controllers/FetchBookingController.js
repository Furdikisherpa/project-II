// controllers/bookingController.js
const connection = require('../config/dbConnection');

const getUserBookings = (req, res) => {
    const userId = req.userId; // Extracted from the middleware

    const query = `
        SELECT booking.BookingID, booking.EventDate, booking.EventTime, booking.Status, artist.Name
        FROM booking
        JOIN artist ON booking.ArtistID = artist.id
        WHERE booking.UserID = ?
    `;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching bookings' });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No bookings found' });
        }

        res.status(200).json(results);
    });
};

module.exports = { getUserBookings };
