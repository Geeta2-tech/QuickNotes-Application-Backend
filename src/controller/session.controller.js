const jwt = require('jsonwebtoken');
const sessionService = require('../services/session.service');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  // Handle user logout by blocking the token
  logoutUser: async (req, res) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
      if (!token) {
        return res.status(400).json({ message: 'Token not provided' }); // If no token is found, send an error
      }

      const decoded = jwt.verify(token, SECRET_KEY); // Verify the token

      // Block the token by adding it to the session blacklist
      await sessionService.blockToken(token, decoded.id);

      res.status(200).json({ message: 'User logged out successfully' }); // Send success response
    } catch (error) {
      res.status(400).json({ message: error.message }); // Send error response in case of failure
    }
  }
};
