const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

const userController = require('../controllers/user');

//get all users
router.get('/users',userController.getAllUsers);

//get a single user
router.get('users/:userId', isAuth, userController.getUser);

module.exports = router;