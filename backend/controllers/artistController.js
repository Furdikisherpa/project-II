const { validationResult } = require('express-validator'); // Import validationResult from express-validator to check for validation errors
const bcrypt = require('bcryptjs'); // Import bcryptjs for hashing passwords securely
const db = require('../config/dbConnection'); // Import the database connection configuration

const artistRegister = (req, res) => {
    const errors = validationResult(req); // Extract validation errors from the request

    if (!errors.isEmpty()) { // If there are validation errors, send a 400 response with the error details
        return res.status(400).json({ errors: errors.array() });
    }

    const username = req.body.username; // Extract the username from the request body
    const password = req.body.password; // Extract the password from the request body
    const email = req.body.email; // Extract the email from the request body

    console.log('Request body:', req.body); // Log the request body to the console for debugging

    if (!password) { // If no password is provided, send a 400 response with an error message
        return res.status(400).json({ msg: "Password is required" });
    }

    // Check if the email or username already exists in the database
    db.query('SELECT * FROM artist WHERE LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?)', 
        [email, username], (err, results) => {
        if (err) { // If there is a database query error, send a 500 response
            return res.status(500).json({ msg: "Database query error" });
        }

        if (results && results.length) { // If the email or username already exists
            const duplicatedField = results[0].email.toLowerCase() === email.toLowerCase() ? 'Email' : 'Username'; // Determine which field is duplicated
            return res.status(400).json({ msg: `${duplicatedField} already exists` }); // Send a 400 response indicating the duplicate field
        }

        // Hash the password before storing it in the database
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) { // If there is an error during password hashing, send a 500 response
                console.error('Error during password hashing:', err);
                return res.status(500).json({ msg: "Error hashing password" });
            }

            // Insert the new artist record into the database with the hashed password
            db.query(
                'INSERT INTO artist (username, password, email) VALUES (?, ?, ?)',
                [username, hash, email],
                (err, results) => {
                    if (err) { // If there is an error during the database insertion, send a 500 response
                        return res.status(500).json({ msg: "Error inserting user" });
                    }
                    return res.status(201).json({ msg: "Artist registered successfully" }); // Send a 201 response indicating successful registration
                }
            );
        });
    });
};

module.exports = {
    artistRegister // Export the artistRegister function for use in other parts of the application
};
