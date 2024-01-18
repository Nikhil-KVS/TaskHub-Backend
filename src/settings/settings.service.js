
const bcrypt = require('bcrypt')
const CustomError = require('../error-handlers/custom.error');
const servicecontroller = require('../models/users.models')
const logger = require('../config/logger');

class profileservice {

    /**
* @method update
* @description for updating users mobile number in db.
* @returns returns updated mobile NUmber successfully when mobileNUmber is updated successfullly in Db.
*/

    async update(body, id) {
        try {

            logger.info('Inside settingsservice: update method');

            const hashedPassword = await bcrypt.hash(body.password, 10)
            // saving the hashed password in data base
            body['password'] = hashedPassword

            const result = await servicecontroller.updateOne({ _id: id }, { $set: body })

            return {
                status: true,
                message: 'updated mobile NUmber successfully',
            }
        }
        catch (error) {

            logger.error(`Inside settingsservice : update method: Error occured while updating mobileNumber in db ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }
}
module.exports = new profileservice();