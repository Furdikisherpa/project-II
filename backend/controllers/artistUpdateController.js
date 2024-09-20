const express = require('express');
const connection = require('../config/dbConnection');

const updateArtistProfile = (req, res) => {
    const { id } = req.params; // Ensure this is 'artistId' if necessary
    const { bio, mediaGallery, location, genre, socialLinks, website, pricingInfo, contactInfo } = req.body; // Updated field names to match frontend

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
    updateArtistProfile
};

