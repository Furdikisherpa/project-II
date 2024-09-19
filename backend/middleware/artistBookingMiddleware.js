const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.ARTIST_JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = { id: decoded.artistId }; // Ensure `artistId` is in your token payload
        next();
    });
};

module.exports = authMiddleware;
