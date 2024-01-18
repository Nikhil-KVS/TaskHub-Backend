
const bcrypt = require('bcrypt')
const roleModel = require('../models/userRoles.model');
// const jwt = require('jsonwebtoken')
const config = require('../config/config')
const logger = require('../config/logger');

const HTTP_STATUS = require('../constants/http.constants')
const CustomError = require('../error-handlers/custom.error');
class userRoleService {

    /**
* @method userRole
* @description to take user details and save in db for signup.
* @returns returns usercontactDetails Taken successfully  when userdetails are added successfully
*/


    async userRole (_id,offset, limit,role,) {
        try {

            if (role == "Admin") {

                const skip = offset * limit;

                console.log("eeeeeeeeeeeeeeeeeeeeeeeeee")
                const excludedId = user_id;
                console.log(excludedId, "iiiiiiiiiiiiiiiiiiiiii")
                // const details = await profileModel.findById({ _id: id }, { email: 1, username: 1, mobileNumber: 1, city: 1, state: 1, zip: 1, Address: 1 })

                var User = await users.find({ _id: { $ne: excludedId } }, { username: 1, email: 1, mobileNumber: 1 }).skip(skip).limit(limit)
                console.log(User, "//////////////////////////")

                var count = await users.find({ _id: { $ne: excludedId } }).countDocuments()
            }

    
            

            return {
                status: true,
                message: 'allUsers retrieved successfully',
            }
        }

        catch (error) {

            logger.error(`Inside  : update method: Error occured while saving usersignup details in db ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

}

module.exports = new userRoleService();
