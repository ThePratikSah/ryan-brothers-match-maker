const express = require('express');

const router = express.Router();

const isAdmin = require('../middleware/is-admin');

const adminController = require('../controllers/administrator');

//get all users
router.get('/users', isAdmin, adminController.getAllUsers);

//get a single user
router.get('users/:userId', isAdmin, adminController.getUser);

//toggle user is verified or not
router.post('users/verify/:userId', isAdmin, adminController.toggleVerifyUser);

//toggle user is authorized
router.post('users/authorized/:userId', isAdmin, adminController.toggleIsAuthorized);

//toggle is user profile complete
router.post('users/complete/:userId', isAdmin, adminController.toggleIsProfileComplete);

module.exports = router;