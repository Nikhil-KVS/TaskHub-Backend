const users = require("../models/users.models")
// const jwt = require('jsonwebtoken')
const config = require('../config/config')
const logger = require('../config/logger');

const HTTP_STATUS = require('../constants/http.constants')
const CustomError = require('../error-handlers/custom.error');
class allUsersService {

    /**
* @method allUsers
* @description to take user details and save in db for signup.
* @returns returns usercontactDetails Taken successfully  when userdetails are added successfully
*/


    async allUsers(user_id, offset, limit, role,) {
        try {

            if (role == "Admin") {
                const skip = offset * limit;


                const excludedId = user_id;

                // const details = await profileModel.findById({ _id: id }, { email: 1, username: 1, mobileNumber: 1, city: 1, state: 1, zip: 1, Address: 1 })

                var User = await users.find({ _id: { $ne: excludedId } }, { username: 1, email: 1, mobileNumber: 1 }).skip(skip).limit(limit)
                var count = await users.find({ _id: { $ne: excludedId } }).countDocuments()
            }
            return {
                status: true,
                message: 'allUsers retrieved successfully',
                data: User,
                count: count,
                role: role
            }
        }

        catch (error) {

            logger.error(`Inside allUsers  :  method: Error occured while retrieving  allUsers from db ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

}

module.exports = new allUsersService();
