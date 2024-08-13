const connection = require('../config/dbConnection');

// Endpoint to retrieve all YouTube video links
const getVideos = (req, res) => {
    const { artistId, userId } = req.query;

    const sql = artistId 
        ? 'SELECT * FROM videos WHERE artistId = ?' 
        : 'SELECT * FROM videos WHERE userId = ?';

    const id = artistId || userId;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Database error", error: err });
        }

        if (!results || results.length === 0) {
            return res.status(404).json({ msg: "No videos found" });
        }

        res.status(200).json(results);
    });
};

module.exports = { getVideos };
