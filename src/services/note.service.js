const { col } = require('sequelize');
const Note = require('../models/note.model');

module.exports = {
  // Create a new note
  createNote: async (noteData) => {
    return await Note.create({
      title: noteData.title,
      content: noteData.content,
      UserId: noteData.userId, // ensure userId is passed in noteData
      color: noteData.color // add color support
    });
  },
  // Get all notes by user ID
  getNotesByUserId: async (userId) => {
    return await Note.findAll({ where: { UserId: userId } });
  },
  // Update a note by ID
  updateNoteById: async (id, noteData, userId) => {
    const note = await Note.findOne({ where: { id, UserId: userId } });
    if (note) {
      note.title = noteData.title || note.title;
      note.content = noteData.content || note.content;
      note.color = noteData.color || note.color;
      return await note.save();
    }
    return null; // Not found or unauthorized
  },
  // Delete a note by ID
  deleteNoteById: async (id, userId) => {
    const note = await Note.findOne({ where: { id, UserId: userId } });
    if (note) {
      return await note.destroy();
    }
    return null; // Not found or unauthorized
  }

};

