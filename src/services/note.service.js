// Import required modules and models
const Note = require('../models/note.model');

module.exports = {
  // Create a new note
  createNote: async (noteData) => {
    return await Note.create({
      title: noteData.title,
      content: noteData.content,
      UserId: noteData.userId, // Ensure userId is passed in noteData
      color: noteData.color // Add color support
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
      // Update note properties if provided in the request
      note.title = noteData.title || note.title;
      note.content = noteData.content || note.content;
      note.color = noteData.color || note.color;
      
      // Save and return the updated note
      return await note.save();
    }

    // Return null if the note is not found or user is unauthorized
    return null;
  },

  // Delete a note by ID
  deleteNoteById: async (id, userId) => {
    const note = await Note.findOne({ where: { id, UserId: userId } });

    if (note) {
      // Destroy the note if found
      return await note.destroy();
    }

    // Return null if the note is not found or user is unauthorized
    return null;
  }
};
