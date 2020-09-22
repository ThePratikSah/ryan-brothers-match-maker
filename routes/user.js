const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/is-auth');

const userController = require('../controllers/user');

//get all users except the logged in user
router.get('/users', isAuth, userController.getAllUsersAfterLogin);

//get all users
router.get('/users',userController.getAllUsers);

//get a single user
router.get('users/:userId', isAuth, userController.getUser);

//update user profile
router.post('/update-profile', isAuth, userController.updateProfile);

//change adhaar number
router.post('/change-adhaar', isAuth, userController.changeAdhaar);

//change mobile number
router.post('/change-mobile', isAuth, userController.changeMobile);

//verify mobile
router.post('/verify-mobile', isAuth, userController.verifyMobile);

//upgrade membership
router.post('/upgrade-membership', isAuth, userController.upgradeMembership);

//mark user as favourite
router.post('/favourites/:userId', isAuth, userController.markUserFavourite);

//remove from favourites
router.post('/favourites/:userId', isAuth, userController.removeFavourite);

module.exports = router;