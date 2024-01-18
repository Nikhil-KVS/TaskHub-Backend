const pieChartModel = require('../models/tasks.models');
const CustomError = require('../error-handlers/custom.error');
const logger = require('../config/logger');


class piechartservice {

    /**
* @method getDetailst
* @description to add users contactDetails in user_contact_details table in Db
* @returns returns usercontactDetails Taken successfully  when contactDetails are added successfully
*/


    async getDetailst(user_id, taskId) {
        try {
            // logger.info('Inside piechartservu: getDetailst method');
            let userId = null;

            console.log("sudheeeer")
            if (taskId == 'null') userId = user_id;
            else userId = taskId;


            var details = await pieChartModel.find({ user_id: userId }, { name: 1, y: 1, Status: 1 })

            console.log(details, "dddddddddddddddddd")

            console.log(typeof (details), "aaaaaaaaaaaaaaaaaaaaa")

            if (details.length == 0) {
                var details = [{ name: ' ', y: 0, status: ' ' }]
            }

            return {
                status: true,
                message: ' details retrieved successfully',
                data: details
            }
        }
        catch (error) {

            console.log(error, "erorrororor");

            // logger.error(`Inside piechartservice: getDetailst method: Error occured while fetching data from db ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }
}
module.exports = new piechartservice();