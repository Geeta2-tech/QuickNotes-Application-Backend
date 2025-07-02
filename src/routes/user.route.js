const { route } = require('.');
const router = require('express').Router();
const userController = require('../controller/user.controller');   
// register a new user
router.post('/register', userController.createUser);

// login a new user
router.post('/login', userController.loginUser);   

module.exports = router;