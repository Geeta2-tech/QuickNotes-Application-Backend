// const { route } = require('.');
const router = require('express').Router();
const userController = require('../controller/user.controller');   
const sessioContController = require('../controller/session.controller');
// const authenticateToken = require('../middleware/auth.middleware');
// register a new user

router.post('/register', userController.createUser);

// login a new user
router.post('/login', userController.loginUser);   

// logout a user
router.post('/logout', sessioContController.logoutUser);

module.exports = router;