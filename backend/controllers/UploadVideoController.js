const jwt = require('jsonwebtoken');
const connection = require('../config/dbConnection');
require('dotenv').config();

const { USER_JWT_SECRET, ARTIST_JWT_SECRET } = process.env;

const uploadVideo = (req, res) => {
    const { videoUrl, artistId, userId } = req.body;
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log('No token provided');
        return res.status(401).json({ msg: "No token provided" });
    }

    const token = authHeader.split(' ')[1];
    let secret, decodedToken;

    if (artistId) {
        secret = ARTIST_JWT_SECRET;
    } else if (userId) {
        secret = USER_JWT_SECRET;
    } else {
        console.log('No valid ID provided for upload');
        return res.status(400).json({ msg: "No valid ID provided for upload" });
    }

    try {
        decodedToken = jwt.verify(token, secret);
        console.log('Decoded Token:', decodedToken);
    } catch (err) {
        console.log('Invalid or expired token:', err);
        return res.status(401).json({ msg: "Invalid or expired token" });
    }

    const { id: loggedInId } = decodedToken;
    const urlUploadingId = artistId || userId;

    if (urlUploadingId !== loggedInId) {
        console.log('Forbidden. You can only upload videos to your own profile.');
        return res.status(403).json({ msg: "Forbidden. You can only upload videos to your own profile." });
    }

    if (!videoUrl) {
        console.log('No video URL provided');
        return res.status(400).json({ msg: "No video URL provided" });
    }

    const sql = artistId 
        ? 'INSERT INTO videos (videoUrl, artistId) VALUES (?, ?)' 
        : 'INSERT INTO videos (videoUrl, userId) VALUES (?, ?)';

    connection.query(sql, [videoUrl, urlUploadingId], (err, result) => {
        if (err) {
            console.log('Database error:', err);
            return res.status(500).json({ msg: "Database error", error: err });
        }
        res.status(200).json({ msg: "Video URL uploaded successfully", id: result.insertId });
    });
};

module.exports = { uploadVideo };
