const User = require('../models/user.model');
const userService = require('../services/user.service');


module.exports = {
  // Create a controller to handle user registration
  createUser: async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },  
// Create a controller to handle user login
  loginUser: async (req, res) => {
    try {
      const user = await userService.loginUser(req.body);
      if (user) {
        res.status(200).json({ message: 'Login successful', user });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}      