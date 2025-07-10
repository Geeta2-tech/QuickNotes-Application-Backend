const router = require('express').Router();
const noteController = require('../controller/note.controller');


// Create a new note
router.post('/', noteController.createNote);        
// Get all notes by user ID
router.get('/user/:userId', noteController.getNotesByUserId);
// update a note by ID
router.put('/:id', noteController.updateNoteById);
// delete a note by ID
router.delete('/:id', noteController.deleteNoteById);   

module.exports = router;
