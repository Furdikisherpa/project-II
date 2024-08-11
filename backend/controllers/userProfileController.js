const connection = require('../config/dbConnection');

const userProfile = (req, res) => {
    const userId = req.params.id; // Use 'id' to match the route parameter

    connection.query('SELECT * FROM user WHERE id = ?', [userId], (err, results) => { // Use 'connection' instead of 'db'
        if (err) {
            return res.status(500).json({ msg: "Database query error" });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(results[0]); // Return artist data
    });
};

module.exports = {
    userProfile
};
