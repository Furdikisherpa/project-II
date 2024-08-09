// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/ProfileController');
const authenticateToken = require('../middleware/authMiddleware');

// Apply the middleware here
router.get('/profile/', authenticateToken, getProfile);

module.exports = router;
