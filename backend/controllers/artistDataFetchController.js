const connection = require('../config/dbConnection'); // Importing the database connection

const artistData = (req, res) => {
    const { genre, location } = req.query; // Extract genre and location from query params
    
    // Base query to select all artists
    let query = 'SELECT * FROM artist';
    
    // Add WHERE clauses for genre and location if provided
    const conditions = [];
    if (genre) {
        conditions.push(`genre = '${genre}'`);
    }
    if (location) {
        conditions.push(`location = '${location}'`);
    }
    
    // If there are conditions, add them to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    connection.query(query, (err, results) => {
        if (err) {
            // Handle database query error
            return res.status(500).json({ msg: "Database query error" });
        }

        if (!results || results.length === 0) {
            // Check if no artists were found
            return res.status(404).json({ msg: "Artists not found" });
        }

        res.status(200).json(results); // Return all artist data with a 200 status
    });
};

module.exports = {
    artistData // Exporting the artistData function for use in routes
};
