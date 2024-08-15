const express = require('express');
const connection = require('../config/dbConnection');

const updateArtistProfile = (req, res) => {
    const { id } = req.params;
    const { bio, profilePicture, location, genres, socialLinks, website } = req.body;

    const sql = `
        UPDATE artist
        SET Bio = ?, MediaGallery = ?, location = ?, Genres = ?, socialLinks = ?, website = ? 
        WHERE id = ?
    `;

    const values = [bio, profilePicture, location, genres, JSON.stringify(socialLinks), website, id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: 'Database error', error: err });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Artist not found' });
        }

        res.status(200).json({ msg: 'Profile updated successfully' });
    });
}

module.exports = {
    updateArtistProfile
};
