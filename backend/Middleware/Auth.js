const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Unauthorized, JWT token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token to request
        console.log('User from token:', req.user); // Debugging log
        next();
    } catch (error) {
        console.error('Token verification error:', error.message); // Debugging log
        return res.status(403).json({ message: "Unauthorized, JWT token wrong or expired" });
    }
};

module.exports = ensureAuthenticated;
