const connection = require('../config/dbConnection'); // Import the DB connection
const jwt = require('jsonwebtoken');
const { 
    ARTIST_JWT_SECRET, USER_JWT_SECRET } = process.env;

const getBookings = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, req.user.role === 'artist' ? ARTIST_JWT_SECRET : USER_JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'artist') return res.status(403).json({ error: 'Forbidden' });

        const query = 'SELECT * FROM booking WHERE ArtistID = ?'; // Fetch bookings for the artist
        connection.query(query, [req.user.id], (err, results) => {
            if (err) {
                console.error('Error fetching bookings:', err);
                return res.status(500).json({ error: 'Failed to fetch bookings' });
            }
            res.json(results);
        });
    } catch (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
};

const acceptBooking = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, req.user.role === 'artist' ? ARTIST_JWT_SECRET : USER_JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'artist') return res.status(403).json({ error: 'Forbidden' });

        const bookingId = req.params.id;
        const query = 'UPDATE booking SET Status = ? WHERE BookingID = ?';
        connection.query(query, ['accepted', bookingId], (err, results) => {
            if (err) {
                console.error('Error accepting booking:', err);
                return res.status(500).json({ error: 'Failed to accept booking' });
            }
            res.json({ message: 'Booking accepted' });
        });
    } catch (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
};

const rejectBooking = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, req.user.role === 'artist' ? ARTIST_JWT_SECRET : USER_JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'artist') return res.status(403).json({ error: 'Forbidden' });

        const bookingId = req.params.id;
        const query = 'UPDATE booking SET Status = ? WHERE BookingID = ?';
        connection.query(query, ['rejected', bookingId], (err, results) => {
            if (err) {
                console.error('Error rejecting booking:', err);
                return res.status(500).json({ error: 'Failed to reject booking' });
            }
            res.json({ message: 'Booking rejected' });
        });
    } catch (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
};

module.exports = {
    getBookings,
    acceptBooking,
    rejectBooking
};
