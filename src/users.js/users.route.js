const express = require('express');
const router = express.Router();
const Auth = require("../middlewares/Auth.middleware")

const allUsersController = require('./users.controller');


router.get('/allUserDetails',Auth.authUser, allUsersController.allUsers);

    
module.exports = router;