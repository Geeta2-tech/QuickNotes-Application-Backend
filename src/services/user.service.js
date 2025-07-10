const User = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
  // Create a new user
  createUser: async (userData) => {
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
        const user = await User.findOne({ where: { email: userData.email} });
        if (user && await bcrypt.compare(userData.password, user.password)) {
            return user;
        }
        return null; // Invalid credentials 
}
};