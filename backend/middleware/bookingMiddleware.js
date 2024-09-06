const jwt = require('jsonwebtoken');
const { ARTIST_JWT_SECRET, USER_JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }

    try {
        // Try to decode the token with both artist and consumer secrets
        const decodedArtist = jwt.verify(token, ARTIST_JWT_SECRET);
        const decodedConsumer = jwt.verify(token, USER_JWT_SECRET);

        if (decodedArtist) {
            req.user = decodedArtist;
            req.user.role = 'artist'; // Set the role for this token
            return next();
        } else if (decodedConsumer) {
            req.user = decodedConsumer;
            req.user.role = 'consumer'; // Set the role for this token
            return next();
        } else {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
    } catch (err) {
        return res.status(401).json({ error: 'Failed to authenticate token' });
    }
};

module.exports = { verifyToken };
