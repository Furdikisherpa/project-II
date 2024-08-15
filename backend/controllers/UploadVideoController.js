const connection = require('../config/dbConnection');

// Endpoint to upload a new YouTube video link
const uploadVideo = (req, res) => {
    const { videoUrl, artistId, userId } = req.body;
    const { userId: loggedInId, role } = req.user; // Extract logged-in user's ID and role from req.user

    // Determine whether the upload is for an artist or a regular user
    const urlUploadingId = artistId || userId;

    // Check if the logged-in user's ID matches the ID associated with the URL being uploaded
    if (urlUploadingId !== loggedInId) {
        return res.status(403).json({ msg: "Forbidden. You can only upload videos to your own profile." });
    }

    if (!videoUrl) {
        return res.status(400).json({ msg: "No video URL provided" });
    }

    const sql = artistId 
        ? 'INSERT INTO videos (videoUrl, artistId) VALUES (?, ?)' 
        : 'INSERT INTO videos (videoUrl, userId) VALUES (?, ?)';

    connection.query(sql, [videoUrl, urlUploadingId], (err, result) => {
        if (err) {
            return res.status(500).json({ msg: "Database error", error: err });
        }
        res.status(200).json({ msg: "Video URL uploaded successfully", id: result.insertId });
    });
};

module.exports = { uploadVideo };
