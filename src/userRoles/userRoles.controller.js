

const CustomError=require('../error-handlers/custom.error')

const Default = require('../config/Default');

const userRoleservice=require('../userRoles/userRoles.service');

const HTTP_STATUS = require('../constants/http.constants')
const logger = require('../config/logger');


class userRoleController extends Default {



	constructor() {
		super();
	}



     /**
* @method 
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description to retrieve users details
* @returns returns successfull response when user details are retrieved successfully
*/
    async userRole(req, res) {
        try {


			logger.info('Inside piechartcontroller: getDetailst method');

            const response = await userRoleservice.userRole(req.body);

            if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				data: response.data,
				status: response.status
			});
        } 
        catch (error) {
			logger.error(`Inside piechartcontroller: getDetailst method: Error occured while getting piechart Details ${error.message}`);
			if (error instanceof CustomError)
				return res.status(error.statusCode).json({
					status: false,
					message: error.message || this.error
				});

			return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
				status: false,
				message: this.error
			});
		}
    }

}

module.exports= new userRoleController();