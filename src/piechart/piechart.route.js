const express = require('express');
const router = express.Router();
const pieChartController = require('../piechart/piechart.controller');
const Auth = require("../middlewares/Auth.middleware")


/**
 * for retrieving details for piechart 
 */

router.get('/chartdetails', Auth.authUser, pieChartController.getDetailst);


module.exports = router;

