const { signup, login } = require('../Controllers/AuthController');
const ensureAuthenticated = require('../Middleware/Auth');
const { signupvalidation, loginpvalidation } = require('../Middleware/Validation');

const express = require('express');
const router = express.Router();


router.post('/login',loginpvalidation,login);

router.post('/signup',signupvalidation,signup);



module.exports= router;