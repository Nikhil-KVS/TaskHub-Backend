const profileModel = require('../models/users.models')
const CustomError = require('../error-handlers/custom.error');

const logger = require('../config/logger');
const { log } = require('winston');

class profileservice {
    /**
* @method signup
* @description to add users contactDetails in user_contact_details table in Db
* @returns returns usercontactDetails Taken successfully  when contactDetails are added successfully
*/

    async updatedetails(body, id) {
        try {

            logger.info('Inside profileservice: updatedetails method');
            const result = await profileModel.updateOne({ _id: id }, { $set: body });

            return {
                status: true,
                message: 'tasks details added successfully',
            }
        }
        catch (error) {

            logger.error(`Inside profileservice : updatedetails method: Error occured while updating profileDetails in db ${error.message}`);

            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

    /**
* @method getDetailst
* @description to add users contactDetails in user_contact_details table in Db
* @returns returns usercontactDetails Taken successfully  when contactDetails are added successfully
*/
    async getDetailst(admin, id) {
        try {

            logger.info('Inside profileservice: getDetailst method');

            let userId = null;
            if (!id) userId = admin;
            else userId = id;
            console.log('userId***********', userId);

            const details = await profileModel.findById({ _id: userId }, { email: 1, username: 1, mobileNumber: 1, city: 1, state: 1, zip: 1, Address: 1, role: 1 })

            return {
                status: true,
                message: 'tasks details getted successfully',
                data: details
            }
        }
        catch (error) {
            console.log('error------', error);
            logger.error(`Inside profileservice : updatedetails method: Error occured while retrieving profileDetails from db ${error.message}`);

            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }
}
module.exports = new profileservice();