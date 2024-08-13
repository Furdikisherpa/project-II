const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConnection');

const register = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const email = db.escape(req.body.email);
    const username = db.escape(req.body.username);
    const password = req.body.password;
    // const fullname = req.body.fullname;
    // const contact = req.body.contact;

    if (!password) { // If no password is provided, send a 400 response with an error message
        return res.status(400).json({ msg: "Password is required" });
    }
    // Check if user already exists
    db.query('SELECT * FROM user WHERE LOWER(email) = LOWER(?) OR LOWER(Username) = LOWER(?)', 
        [email, username], (err, results) => {
        if (err) { // If there is a database query error, send a 500 response
            return res.status(500).json({ msg: "Database query error" });
        }

        if (results && results.length) { // If the email or username already exists
            const duplicatedField = results[0].email.toLowerCase() === email.toLowerCase() ? 'Email' : 'Username'; // Determine which field is duplicated
            return res.status(400).json({ msg: `${duplicatedField} already exists` }); // Send a 400 response indicating the duplicate field
        }

            // Hash password and insert new user
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(400).json({ msg: 'Error hashing password' });
                }

                

                db.query(
                    `INSERT INTO user (Username, email, password) VALUES (${username}, ${email}, ${db.escape(hash)});`,
                    (err, result) => {
                        if (err) {
                            return res.status(500).json({ msg:err.message });
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
