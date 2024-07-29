const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConnection');

const artistRegister = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const artistname = req.body.artistname;
    const genre = req.body.genre;
    const artistBio = req.body.artistBio;
    const artistPassword = req.body.artistPassword;
    const artistEmail = req.body.artistEmail;
    const mediagallery = req.body.mediagallery;
    const priceinfo = req.body.priceinfo;
    const contactinfo = req.body.contactinfo;

    // Check if user already exists
    db.query('SELECT * FROM artist WHERE LOWER(email) = LOWER(?)', [artistEmail], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Database query error" });
        }

        if (results && results.length) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash password and insert new user
        bcrypt.hash(artistPassword, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ msg: "Error hashing password" });
            }
            db.query(
                'INSERT INTO artist (Name, password, email, Genre, Bio, MediaGallery, PricingInfo, ContactInfo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [artistname, hash, artistEmail, genre, artistBio, mediagallery, priceinfo, contactinfo],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ msg: "Error inserting user" });
                    }
                    return res.status(201).json({ msg: "Artist registered successfully" });
                }
            );
        });
    });
};

module.exports = {
    artistRegister
};
