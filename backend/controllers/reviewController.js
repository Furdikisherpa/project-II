const { validationResult } = require('express-validator');
const db = require('../config/dbConnection');

const review = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {Rating, Comment, UserID, ArtistID } = req.body;

    const query = `
        INSERT INTO review (Rating, Comment, UserID, ArtistID )
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [Rating, Comment, UserID, ArtistID ], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Error inserting review", error: err });
        }
        return res.status(201).json({ msg: "review posted Successfully"});
    });
};

module.exports = {
    review
};
