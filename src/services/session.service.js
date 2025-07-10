const Session = require('../models/session.model');

module.exports = {
  blockToken: async (token, userId, expiresAt) => {
    return await Session.create({
      token,
      userId,
    });
  },

  isTokenBlacklisted: async (token) => {
    return await Session.findOne({ where: { token } });
  },
};
