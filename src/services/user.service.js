const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
  // Create a new user
  createUser: async (userData) => {
    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      // Throw an error to be caught by controller
      throw new Error('User already exists. Please login.');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
    });
    return await user.save();
  },
  //  Login a user
  loginUser: async (userData) => {
    const user = await User.findOne({ where: { email: userData.email } });
    if (user && await bcrypt.compare(userData.password, user.password)) {
      return user;
    }
    return null; // Invalid credentials 
  },
  // Logout a user
  // deleteUserById: async (id) => {
  //     const user = await User.findByPk(id);
  //     if(user) {
  //       return await user.destroy();
  //     }
  //     return null; // User not found
  // }

};