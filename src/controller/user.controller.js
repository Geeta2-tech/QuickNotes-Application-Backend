const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; 
const blacklistedTokens = require('../utils/tokenBlocklist');

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await userService.loginUser(req.body);
      if (user) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          SECRET_KEY,
          { expiresIn: '7d' }
        );

        res.status(200).json({ message: 'Login successful', token, user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
