

const CustomError = require('../error-handlers/custom.error');

const Default = require('../config/Default');

const allUsersService = require('./users.service')

const HTTP_STATUS = require('../constants/http.constants')
const logger = require('../config/logger');


class allUsersController extends Default {

	constructor() {
		super();
	}

	/**
* @method allUsers
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description to retrieve users details
* @returns returns successfull response when user details are retrieved successfully
*/
	async allUsers(req, res) {
		try {

			logger.info('Inside  allUsersController: allUsers method');

			const response = await allUsersService.allUsers(req.payload.user._id, req.query.offset, req.query.limit, req.payload.user.role,);

			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				data: response.data,
				status: response.status,
				count: response.count,
				role: response.role
			});
		}
		catch (error) {
			logger.error(`Inside allUsersController : allUsers method: Error occured while getting allUsers Details ${error.message}`);
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

module.exports = new allUsersController();