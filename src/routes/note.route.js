const router = require('express').Router();
const noteController = require('../controller/note.controller');
const authenticateToken = require('../middleware/auth.middleware');

// Protect all note routes
router.post('/create', authenticateToken, noteController.createNote);
router.get('/get-all-by-uid', authenticateToken, noteController.getNotesByUserId);
router.put('/update', authenticateToken, noteController.updateNoteById);
router.delete('/delete', authenticateToken, noteController.deleteNoteById);

module.exports = router;
