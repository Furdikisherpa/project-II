const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'No token provided. Authorization denied.' });
    }

    const { artistId, userId } = req.body;
    let secret;

    if (artistId) {
        secret = process.env.ARTIST_JWT_SECRET;
    } else if (userId) {
        secret = process.env.USER_JWT_SECRET;
    } else {
        return res.status(400).json({ msg: 'Invalid request. No artistId or userId provided.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ msg: 'Invalid token. Authorization denied.' });
    }
};

module.exports = authMiddleware;
