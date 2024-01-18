
const bcrypt = require('bcrypt')
const UserModel = require('./Sign_user.model')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const logger = require('../config/logger');

const HTTP_STATUS = require('../constants/http.constants')
const CustomError = require('../error-handlers/custom.error');
class signuserservice {

    /**
* @method signup
* @description to take user details and save in db for signup.
* @returns returns usercontactDetails Taken successfully  when userdetails are added successfully
*/


    async signup(userDetails) {
        try {

            logger.info('Inside  signuserservice: signup method');
            // hashing password using bvrypt library
            const hashedPassword = await bcrypt.hash(userDetails.password, 10)
            // saving the hashed password in data base
            userDetails['password'] = hashedPassword
            const UserModelData = new UserModel(userDetails)
            const newUser = await UserModelData.save();

            return {
                status: true,
                message: 'usercontactDetails Taken successfully',
            }
        }

        catch (error) {

            logger.error(`Inside  : update method: Error occured while saving usersignup details in db ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }


    /**
* @method signinUser
* @description to take user details and save in db for signin.
* @returns returns Sign in success when user sigin successfully
*/

    async signinUser(userDetails) {
        try {

            logger.info('Inside  signuserservice: signinUser method');
            const user = await UserModel.findOne({ email: userDetails.email });
            if (!user) {
                throw new CustomError('please sign up', HTTP_STATUS.UNAUTHORIZED);
            }

            const isValidUser = await bcrypt.compare(userDetails.password, user.password);
            if (isValidUser) {
                // Generate a JWT token if the password is valid

                const token = jwt.sign({ user }, config.jwt.secret);

                return {
                    status: true,
                    message: 'Sign in success',
                    data: token,
                    // users:allUsers
                };
            }

            else {
                throw new CustomError('please sign up', HTTP_STATUS.UNAUTHORIZED);
            }
        }

        catch (error) {

            logger.error(`Inside  : update method: Error occured while checking userdetails in db ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

}

module.exports = new signuserservice();
