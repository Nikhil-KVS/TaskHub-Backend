const express = require('express');
const router = express.Router();
const userController = require('./tasks.controller');
const Auth = require("../middlewares/Auth.middleware")


/**
 * for updating users password
 */

router.get('/taskDetails', Auth.authUser, userController.gettasks);


// router.get('/tasksByKey',Auth.authUser,userController.getTasksByKey);


router.get('/detailsById/:taskId', Auth.authUser, userController.gettasksById);
//details


router.post('/saveTask', Auth.authUser, userController.savetasks);


router.put('/updateTask/:taskId', Auth.authUser, userController.updatetasks);


router.delete('/deleteById/:taskId', Auth.authUser, userController.deleteTask);

module.exports = router;
