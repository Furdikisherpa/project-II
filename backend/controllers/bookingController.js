const { validationResult } = require('express-validator');
const db = require('../config/dbConnection');

const createBooking = (req, res) => {
    console.log(req.body); // Log the incoming request body

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { EventDate, EventTime, UserID, ArtistID, Status } = req.body;

    const query = `
        INSERT INTO booking (EventDate, EventTime, UserID, ArtistID, Status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [EventDate, EventTime, UserID, ArtistID, Status], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Error inserting booking", error: err });
        }
        return res.status(201).json({ msg: "Booking created successfully", bookingId: results.insertId });
    });
};

module.exports = {
    createBooking
};