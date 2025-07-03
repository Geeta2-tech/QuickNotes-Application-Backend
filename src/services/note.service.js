const Note = require('../models/note.model');

module.exports = {
  // Create a new note
  createNote: async (noteData) => {
    return await Note.create({
      title: noteData.title,
      content: noteData.content,
      UserId: noteData.userId,
      color: noteData.color // add color support
    });
  },    
    // Get all notes by user ID
    getNotesByUserId: async (userId) => {
      return await Note.findAll({ where: { userId } });
    },
    // Update a note by ID
    updateNoteById: async (id, noteData) => {
      const note = await Note.findByPk(id);
      if (note) {
        note.title = noteData.title || note.title;
        note.content = noteData.content || note.content;
        return await note.save();
      }
      return null; // Note not found
    },
    // Delete a note by ID
    deleteNoteById: async (id) => {
      const note = await Note.findByPk(id);
      if (note) {
        return await note.destroy();
      }
      return null; // Note not found
    }
};

