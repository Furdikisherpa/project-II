const jwt = require('jsonwebtoken');
const db = require('../config/dbConnection');
const { ARTIST_JWT_SECRET } = process.env;

const getBooking = (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, ARTIST_JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'artist') return res.status(403).json({ error: 'Forbidden' });

        const query = 
        'SELECT * FROM booking WHERE ArtistID = ?'; // Fetch bookings for the artist
        db.query(query, [req.user.id], (err, results) => {
            if (err) {
                console.error('Error fetching bookings:', err);
                return res.status(500).json({ error: 'Failed to fetch bookings' });
            }
            if (results.length === 0) return res.status(404).json({ msg: 'No bookings found for this artist' });
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
        const decoded = jwt.verify(token, ARTIST_JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'artist') return res.status(403).json({ error: 'Forbidden' });

        const bookingId = req.params.bookingID;
        const query = 'UPDATE booking SET Status = ? WHERE BookingID = ? AND ArtistID = ?';
        db.query(query, ['accepted', bookingId, req.user.id], (err, results) => {
            if (err) {
                console.error('Error accepting booking:', err);
                return res.status(500).json({ error: 'Failed to accept booking' });
            }
            if (results.affectedRows === 0) return res.status(404).json({ msg: 'Booking or artist not found' });
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
        const decoded = jwt.verify(token, ARTIST_JWT_SECRET);
        req.user = decoded;

        if (req.user.role !== 'artist') return res.status(403).json({ error: 'Forbidden' });

        const bookingId = req.params.bookingID;
        const query = 'UPDATE booking SET Status = ? WHERE BookingID = ? AND ArtistID = ?';
        db.query(query, ['rejected', bookingId, req.user.id], (err, results) => {
            if (err) {
                console.error('Error rejecting booking:', err);
                return res.status(500).json({ error: 'Failed to reject booking' });
            }
            if (results.affectedRows === 0) return res.status(404).json({ msg: 'Booking or artist not found' });
            res.json({ message: 'Booking rejected' });
        });
    } catch (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
};

module.exports = {
    getBooking,
    acceptBooking,
    rejectBooking
};
