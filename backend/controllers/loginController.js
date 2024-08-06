const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/dbConnection');

const loginValidation = [
    check('artistEmail').isEmail().withMessage('Please include a valid email'),
    check('artistPassword').notEmpty().withMessage('Password is required')
];

const artistLogin = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { artistEmail, artistPassword } = req.body;

    db.query('SELECT * FROM artist WHERE email = ?', [artistEmail], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ msg: "Database query error" });
        }

        if (!results || !results.length) {
            return res.status(400).json({ msg: "Email or password is incorrect" });
        }

        const user = results[0];

        bcrypt.compare(artistPassword, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ msg: "Error comparing passwords" });
            }

            if (!isMatch) {
                return res.status(400).json({ msg: "Email or password is incorrect" });
            }

            // Debugging: Check JWT_SECRET
            console.log('JWT_SECRET:', process.env.JWT_SECRET);

            const token = jwt.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ msg: "Login successful", token });
        });
    });
};

module.exports = {
    artistLogin,
    loginValidation
};
