const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// register new user //
router.post('/registerUser', userController.UserRegister);

//user login //
router.post('/userlogin', userController.UserLogin);

router.post('/getFriendsData', userController.getFriendsData)

router.get('/getFriendsDataById/:userId', userController.getFriendsDataById)

router.get('/getUpdatedFriendsAndRequest/:userId', userController.getUpdatedFriendsAndRequest)

router.post('/removeFriend', userController.removeFriend)

router.post('/addFriend', userController.addFriend)

router.post('/acceptRequest', userController.acceptRequest)

router.post('/rejectRequest', userController.rejectRequest)

router.get('/getSearchData/:searchText', userController.getSearchData)

module.exports = router;