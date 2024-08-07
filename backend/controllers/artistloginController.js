const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const db = require('../config/dbConnection');

const artistlogin = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { artistEmail, artistPassword } = req.body;

    db.query('SELECT * FROM artist WHERE Email=?', [artistEmail], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ msg: "Database query error" });
        }

        if (!results || !results.length) {
            return res.status(400).json({ msg: 'Email or password is incorrect' });
        }

        const artist = results[0];
        bcrypt.compare(artistPassword, artist.password, (err, isMatch) => {
            if (err) {
                console.error('Password comparison error:', err);
                return res.status(500).json({ msg: "Error comparing passwords" });
            }

            if (!isMatch) {
                return res.status(400).json({ msg: "Email or password is incorrect" });
            }

            // Debugging: Check JWT_SECRET
            console.log('JWT_SECRET:', process.env.JWT_SECRET);

            const token = jwt.sign(
                { id: artist.id, email: artist.Email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ msg: "Login successful", token });
        });
    });
};

module.exports = {
    artistlogin
};
