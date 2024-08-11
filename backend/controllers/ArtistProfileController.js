const connection = require('../config/dbConnection');

const artistProfile = (req, res) => {
    const artistId = req.params.id;

    connection.query('SELECT * FROM artist WHERE id = ?', [artistId], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ msg: "Database query error" });
        }

        if (!results.length) {
            return res.status(404).json({ msg: "Artist not found" });
        }

        res.status(200).json(results[0]);
    });
};

module.exports = {
    artistProfile
};
