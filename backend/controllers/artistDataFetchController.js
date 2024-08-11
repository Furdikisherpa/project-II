const connection = require('../config/dbConnection'); // Importing the database connection

const artistData = (req, res) => {
    // Handle the request to fetch artist data from the database
    connection.query('SELECT * FROM artist', (err, results) => { // Query to select all artists from the database
        if (err) {
            // Handle database query error
            return res.status(500).json({ msg: "Database query error" }); // Return a 500 error with a message
        }

        if (!results || results.length === 0) {
            // Check if no artists were found
            return res.status(404).json({ msg: "Artists not found" }); // Return a 404 error with a message
        }

        res.status(200).json(results); // Return all artist data with a 200 status
    });
};

module.exports = {
    artistData // Exporting the artistData function for use in routes
};
