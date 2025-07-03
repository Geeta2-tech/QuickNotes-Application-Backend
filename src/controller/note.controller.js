const noteService = require('../services/note.service');
const router = require('express').Router();

module.exports = {
  // Create a new note
  createNote: async (req, res) => {
    try {
      const note = await noteService.createNote(req.body);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },            
    // Get all notes by user ID     
    getNotesByUserId: async (req, res) => {
      try {
        const notes = await noteService.getNotesByUserId(req.params.userId);
        res.status(200).json(notes);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
    // Update a note by ID
    updateNoteById: async (req, res) => {
      try {
        const note = await noteService.updateNoteById(req.params.id, req.body);
        if (note) {
          res.status(200).json(note);
        } else {
          res.status(404).json({ message: 'Note not found' });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
    // Delete a note by ID
    deleteNoteById: async (req, res) => {
      try {
        const result = await noteService.deleteNoteById(req.params.id);
        if (result) {
          res.status(204).send();
        } else {
          res.status(404).json({ message: 'Note not found' });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
};
