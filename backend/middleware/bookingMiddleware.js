const jwt = require('jsonwebtoken');
require('dotenv').config();

const bookingMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ msg: 'Authentication token is missing' });
    }

    try {
        // Verify the token using the USER_JWT_SECRET first
        let decoded = jwt.verify(token, process.env.USER_JWT_SECRET);

        // If the token is valid, attach userId to the request
        if (decoded.id) {
            req.userId = decoded.id;
        } else {
            return res.status(401).json({ msg: 'Invalid token: no userId found' });
        }

        next();
    } catch (err) {
        // If verification with USER_JWT_SECRET fails, try with ARTIST_JWT_SECRET
        try {
            const decoded = jwt.verify(token, process.env.ARTIST_JWT_SECRET);

            // If the token is valid, attach artistId to the request
            if (decoded.id) {
                req.artistId = decoded.id;
                next();
            } else {
                return res.status(401).json({ msg: 'Invalid token: no artistId found' });
            }
        } catch (err) {
            console.error('Token verification error:', err);
            return res.status(401).json({ msg: 'Unauthorized access' });
        }
    }
};

module.exports = bookingMiddleware;
