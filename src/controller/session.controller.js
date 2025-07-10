const jwt = require('jsonwebtoken');
const sessionService = require('../services/session.service');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  // Create a controller to handle user logout
  logoutUser: async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: 'Token not provided' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    await sessionService.blockToken(
      token,
      decoded.id,
      
    );

    console.log('Token stored in session blocklist:', token);
    res.status(200).json({ message: 'User logged out successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
}
