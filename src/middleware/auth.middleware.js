const jwt = require('jsonwebtoken');
const Session = require('../models/session.model');
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key_here';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Check if SECRET_KEY is set
  if (!SECRET_KEY) {
    return res.status(500).json({ message: 'Internal server error: SECRET_KEY not set' });
  }

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Check if the token is blacklisted
    const blacklisted = await Session.findOne({ where: { token } });
    if (blacklisted) {
      return res.status(401).json({ message: 'You are logged out. Please log in again.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    req.user = decoded;  // Attach the decoded user info to the request
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
