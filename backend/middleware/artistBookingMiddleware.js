const jwt = require('jsonwebtoken');
const { ARTIST_JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    try {
        const decoded = jwt.verify(token, ARTIST_JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
};

const checkArtistRole = (req, res, next) => {
    if (req.user.role !== 'artist') return res.status(403).json({ error: 'Forbidden' });
    next();
};


module.exports = {
    verifyToken,
    checkArtistRole
};
