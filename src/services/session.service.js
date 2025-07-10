// Import the Session model
const Session = require('../models/session.model');

module.exports = {
  // Block a token by creating a session record
  blockToken: async (token, userId, expiresAt) => {
    return await Session.create({
      token,
      userId,
    });
  },

  // Check if a token is blacklisted
  isTokenBlacklisted: async (token) => {
    return await Session.findOne({ where: { token } });
  },
};
