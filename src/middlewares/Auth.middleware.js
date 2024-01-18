// const passport = require('passport');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config=require('../config/config')


///for verifictation of token
const authUser = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const bearer = header.split(' ');
        const token = bearer[1];
        
        const secret  = process.env.JWT_SECRET;

        const payload = jwt.verify(token, secret);

        req.payload = payload

        next();

    } catch (error) {

      return error.message
    }
};

module.exports= {authUser};

