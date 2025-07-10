const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user.model');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#FFD700', // Default card color (gold/yellow)
    validate: {
      is: /^#([0-9A-Fa-f]{3}){1,2}$/ // Validates hex code like #FFF or #FFFFFF
    }
  }
});

// One-to-many relationship: A user can have many notes
User.hasMany(Note, { onDelete: 'CASCADE' });
Note.belongsTo(User);

module.exports = Note;
