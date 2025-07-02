const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const User = require('./user.model');

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '#FFD700' // default card color (gold/yellow)
  }
})

// One-to-many: A user can have many notes
User.hasMany(Note, { onDelete: 'CASCADE' });
Note.belongsTo(User);

module.exports = Note;
