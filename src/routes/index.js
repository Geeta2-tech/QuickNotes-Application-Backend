const router = require('express').Router();
const userRoutes = require('./user.route');
const noteRoutes = require('./note.route');

// Use the user routes
router.use('/users', userRoutes);

// Use the note routes
router.use('/notes', noteRoutes);

module.exports = router;
