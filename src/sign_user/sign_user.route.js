const express = require('express');
const router = express.Router();

const userController = require('./sign_user.controller');


router.post('/signup',userController.signupNewUser);

    

router.post('/signin', userController.signinUser);


module.exports = router;