const express = require('express');
const router = express.Router();
const settingscontroller = require('./settings.controller');
const Auth = require("../middlewares/Auth.middleware")


/**
 * for updating users password
 */

router.put('/save', Auth.authUser,settingscontroller.update);

module.exports=router;
