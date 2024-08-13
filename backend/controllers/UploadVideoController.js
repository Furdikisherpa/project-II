const connection = require('../config/dbConnection');

// Endpoint to upload a new YouTube video link
const uploadVideo = (req, res) => {
    const { videoUrl, artistId, userId } = req.body;
    
    if (!videoUrl) {
        return res.status(400).json({ msg: "No video URL provided" });
    }

    const sql = artistId 
        ? 'INSERT INTO videos (videoUrl, artistId) VALUES (?, ?)' 
        : 'INSERT INTO videos (videoUrl, userId) VALUES (?, ?)';

    const id = artistId || userId;

    connection.query(sql, [videoUrl, id], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Database error", error: err });
        }
        res.status(200).json({ msg: "Video URL uploaded successfully", id: result.insertId });
    });
};


module.exports ={ uploadVideo};
