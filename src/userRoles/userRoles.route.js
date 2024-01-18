const express = require('express');
const router = express.Router();

const roleController = require('./userRoles.controller');


router.post('/userRole',roleController.signupNewUser);

    



module.exports = router;