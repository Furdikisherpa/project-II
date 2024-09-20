const express = require('express');
const connection = require('../config/dbConnection');
const multer = require('multer');
const path = require('path');

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage });

const updateArtistProfile = (req, res) => {
    const { id } = req.params; // This should match the route parameter
    const { bio, location, genre, socialLinks, website, pricingInfo, contactInfo } = req.body;
    let mediaGallery = req.file ? req.file.path : null; // Get the uploaded file path

    const sql = `
        UPDATE artist
        SET Bio = ?, MediaGallery = ?, Location = ?, Genre = ?, SocialLinks = ?, Website = ?, PricingInfo = ?, ContactInfo = ?
        WHERE id = ?
    `;

    const values = [bio, mediaGallery, location, genre, JSON.stringify(socialLinks), website, pricingInfo, contactInfo, id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: 'Database error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Artist not found' });
        }

        res.status(200).json({ msg: 'Profile updated successfully' });
    });
};

module.exports = {
    updateArtistProfile,
    upload // Export multer upload for route usage
};
