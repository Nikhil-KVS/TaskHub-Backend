const express = require('express');
const router = express.Router();
const profileController = require('./profile.controller');
const Auth = require("../middlewares/Auth.middleware")


/**
 * for saving users details 
 */
router.put('/save', Auth.authUser, profileController.updatedetails);



/**
 * for retrieving users details 
 */

router.get('/details/:taskId', Auth.authUser, profileController.getDetailst);


module.exports = router;


// $$$$$$$$$$$



