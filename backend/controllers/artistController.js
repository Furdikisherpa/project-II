const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConnection');

const artistRegister = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    console.log('Request body:', req.body); // Log request body to ensure correct data

    if (!password) {
        return res.status(400).json({ msg: "Password is required" });
    }

    // Check if user already exists
    db.query('SELECT * FROM artist WHERE LOWER(email) = LOWER(?)', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Database query error" });
        }

        if (results && results.length) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash password and insert new user
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error during password hashing:', err);
                return res.status(500).json({ msg: "Error hashing password" });
            }

            db.query(
                'INSERT INTO artist (Name, password, email) VALUES (?, ?, ?)',
                [username, hash, email],
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
