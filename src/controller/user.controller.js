// const User = require('../models/user.model');
const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; 
const blacklistedTokens = require('../utils/tokenBlocklist'); // Import the blocklist


module.exports = {
  // Create a controller to handle user registration
  createUser: async (req, res) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({message: 'User created successfully'});
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },  
// Create a controller to handle user login


loginUser: async (req, res) => {
  try {
    const user = await userService.loginUser(req.body);
    if (user) {
      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email }, // payload
        SECRET_KEY,
        { expiresIn: 7 * 24 * 60 * 60 } // 7 days in seconds
      );

      res.status(200).json({ message: 'Login successful', token, user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
},

// Create a controller to handle user logout
// logoutUser: async (req, res) => {
//   try {
//     const token = req.headers['authorization']?.split(' ')[1];

//     if (!token) {
//       return res.status(400).json({ message: 'Token not provided' });
//     }

//     blacklistedTokens.add(token);
//      // ✅ store it in blocklist
//      console.log('Token added to blocklist:', token);

//     res.status(200).json({ message: 'User logged out successfully' });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }
}      