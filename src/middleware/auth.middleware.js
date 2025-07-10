const jwt = require('jsonwebtoken');
const Session = require('../models/session.model'); 
const SECRET_KEY = process.env.SECRET_KEY || 'your_default_secret_key_here';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Received Token:', token);

  if (!SECRET_KEY) {
    console.error('SECRET_KEY is not set. Please set the environment variable SECRET_KEY.');
    return res.status(500).json({ message: 'Internal server error: SECRET_KEY not set' });
  }

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const blacklisted = await Session.findOne({ where: { token } });
    if (blacklisted) {
      return res.status(401).json({ message: 'You are logged out. Please log in again.' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('Decoded Token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT Error:', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
