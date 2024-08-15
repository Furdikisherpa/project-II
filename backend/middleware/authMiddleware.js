const jwt = require('jsonwebtoken');

// Middleware to authenticate requests
const authMiddleware = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ msg: 'No token provided. Authorization denied.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = {
            userId: decoded.userId,
            role: decoded.role, // Optional: if you store roles in the token
        };

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ msg: 'Invalid token. Authorization denied.' });
    }
};

module.exports = authMiddleware;
