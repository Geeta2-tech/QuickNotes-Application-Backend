const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql', // Default to 'mysql' if not specified
  logging: false, // Disable logging for cleaner output
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Sync models with the database
    // force: false means it won't drop existing tables, but will create them if they don't exist
    // If you want to drop and recreate tables, set force: true (use with caution)  
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}   

// Export the sequelize instance and the connect function
module.exports = {
  sequelize,
  connectToDatabase,
};

