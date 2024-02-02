
const express = require('express');
const router = express.Router();

const {register, userLogin, userProfile} = require('../controllar/controllar')
const {authUser} = require('../middleware/Auth-middleware');

// for user register
router.post('/register', register);

// for user login
router.post('/userlogin', userLogin);

// for user profile
router.get('/userprofile', authUser, userProfile);


module.exports = router;