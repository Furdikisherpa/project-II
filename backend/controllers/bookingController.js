const { validationResult } = require('express-validator');
const db = require('../config/dbConnection');

const createBooking = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { EventDate, UserID, ArtistID, Status, TotalPrice } = req.body;

    const query = `
        INSERT INTO booking (EventDate, UserID, ArtistID, Status, TotalPrice)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [EventDate, UserID, ArtistID, Status, TotalPrice], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Error inserting booking", error: err });
        }
        return res.status(201).json({ msg: "Booking created successfully", bookingId: results.insertId });
    });
};

module.exports = {
    createBooking
};
