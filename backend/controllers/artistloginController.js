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

    const { email, password } = req.body;

    db.query('SELECT * FROM artist WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ msg: "Database query error" });
        }

        if (!results.length) {
            return res.status(400).json({ msg: 'Email or password is incorrect' });
        }

        const artist = results[0];
        bcrypt.compare(password, artist.password, (err, isMatch) => {
            if (err) {
                console.error('Password comparison error:', err);
                return res.status(500).json({ msg: "Error comparing passwords" });
            }

            if (!isMatch) {
                return res.status(400).json({ msg: "Email or password is incorrect" });
            }

            const token = jwt.sign(
                { id: artist.id, email: artist.email },
                process.env.ARTIST_JWT_SECRET,
                { expiresIn: '1h' }
            );

            console.log('Login successful for artist:', artist.id);
            return res.status(200).json({ msg: "Login successful", token, artistId: artist.id });
        });
    });
};

module.exports = {
    artistlogin
};
