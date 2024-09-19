const jwt = require('jsonwebtoken');

const artistAuthMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ARTIST_JWT_SECRET);

        if (decoded && decoded.id) { // Ensure 'id' matches 'artistId'
            req.artistId = decoded.id;  // Set artistId to req object
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Invalid artist token' });
        }
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = artistAuthMiddleware;
