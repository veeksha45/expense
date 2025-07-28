const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);

module.exports = router;
