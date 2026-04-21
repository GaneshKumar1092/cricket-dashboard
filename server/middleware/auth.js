// middleware/auth.js - JWT authentication middleware
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to request
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token invalid' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Optional: Admin-only access middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Admins only' });
  }
};

module.exports = { protect, adminOnly };