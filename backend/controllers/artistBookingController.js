const db = require('../config/dbConnection');


const getBooking = (req, res) => {
    const { id: artistId } = req.user; // Extract artist ID from decoded token

    const query = `
        SELECT booking.BookingID, booking.BookingDate, booking.EventDate, booking.EventTime, booking.Status, booking.TotalPrice, artist.Name
        FROM booking
        JOIN artist ON booking.ArtistID = artist.id
        WHERE booking.ArtistID = ?
    `; // Fetch bookings for the artist

    db.query(query, [artistId], (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ error: 'Failed to fetch bookings' });
        }
        console.log('Booking results:', results); // Debug log
        if (results.length === 0) return res.status(404).json({ message: 'No bookings found for this artist' });
        res.json(results);
    });
};

const acceptBooking = (req, res) => {
    const { id: artistId } = req.user; // Extract artist ID from decoded token
    const { bookingID } = req.params;

    const query = 'UPDATE booking SET Status = ? WHERE BookingID = ? AND ArtistID = ?';
    db.query(query, ['accepted', bookingID, artistId], (err, results) => {
        if (err) {
            console.error('Error accepting booking:', err);
            return res.status(500).json({ error: 'Failed to accept booking' });
        }
        console.log('Accept booking results:', results); // Debug log
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Booking or artist not found' });
        res.json({ message: 'Booking accepted' });
    });
};

const rejectBooking = (req, res) => {
    const { id: artistId } = req.user; // Extract artist ID from decoded token
    const { bookingID } = req.params;

    const query = 'UPDATE booking SET Status = ? WHERE BookingID = ? AND ArtistID = ?';
    db.query(query, ['rejected', bookingID, artistId], (err, results) => {
        if (err) {
            console.error('Error rejecting booking:', err);
            return res.status(500).json({ error: 'Failed to reject booking' });
        }
        console.log('Reject booking results:', results); // Debug log
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Booking or artist not found' });
        res.json({ message: 'Booking rejected' });
    });
};

module.exports = {
    getBooking,
    acceptBooking,
    rejectBooking
};
