const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConnection');

const artistLogin = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { artistEmail, artistPassword } = req.body;

    // Check if user exists
    db.query('SELECT * FROM user WHERE Email = ?', [artistEmail], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Database query error" });
        }

        if (!results || !results.length) {
            return res.status(400).json({ msg: "Email or password is incorrect" });
        }

        const user = results[0];

        // Compare passwords
        bcrypt.compare(artistPassword, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ msg: "Error comparing passwords" });
            }

            if (!isMatch) {
                return res.status(400).json({ msg: "Email or password is incorrect" });
            }

            // Generate token
            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                msg: "Login successful",
                token
            });
        });
    });
};

module.exports = {
    artistLogin
};
