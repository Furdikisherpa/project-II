const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConnection');

const register = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = db.escape(req.body.email);
    const name = db.escape(req.body.name);
    const password = req.body.password;

    // Check if user already exists
    db.query(
        `SELECT * FROM user WHERE LOWER(Email) = LOWER(${email});`,
        (err, result) => {
            if (err) {
                return res.status(500).json({ msg: 'Database query error' });
            }

            if (result && result.length) {
                return res.status(409).json({ msg: 'This user is already in use!' });
            }

            // Hash password and insert new user
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(400).json({ msg: 'Error hashing password' });
                }

                db.query(
                    `INSERT INTO user (Username, Email, Password) VALUES (${name}, ${email}, ${db.escape(hash)});`,
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ msg: 'Database query error' });
                        }

                        return res.status(201).json({ msg: 'User has been registered' });
                    }
                );
            });
        }
    );
};

module.exports = {
    register
};
