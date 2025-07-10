const noteService = require('../services/note.service');

module.exports = {
  // Create a new note
  createNote: async (req, res) => {
    try {
      const userId = req.user.id;
      const note = await noteService.createNote({ ...req.body, userId });
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all notes by user ID (from token)
  getNotesByUserId: async (req, res) => {
    try {
      const userId = req.user.id;
      const notes = await noteService.getNotesByUserId(userId);
      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Update a note by ID
  updateNoteById: async (req, res) => {
    try {
      const userId = req.user.id;
      const note = await noteService.updateNoteById( req.query.id, req.body, userId);
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: 'Note not found or unauthorized' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete a note by ID
  deleteNoteById: async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await noteService.deleteNoteById(req.query.id, userId);
      if (result) {
        res.status(200).json({ message: 'Note deleted successfully' });
      } else {
        res.status(404).json({ message: 'Note not found or unauthorized' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};
