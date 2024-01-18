const profileservice = require('./profile.service')
const CustomError = require('../error-handlers/custom.error');
const logger = require('../config/logger');

const Default = require('../config/Default');

const HTTP_STATUS = require('../constants/http.constants')

// const logger=require('../config/logger')

class profilecontoller extends Default {

	constructor() {
		super();
	}

	/**
* @method save
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description to save updated users details in profile
* @returns returns successfull response when user details are saved successfully
*/
	async updatedetails(req, res) {


		try {

			logger.info('Inside profilecontroller: updatedetails method');
			const response = await profileservice.updatedetails(req.body, req.payload.user._id);

			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				status: response.status
			});
		}

		catch (error) {
			logger.error(`Inside profilecontroller:  updatedetails method: Error occured while getting updating users Details ${error.message}`);
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


	/**
* @method getDetailst
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description to retrieve users details
* @returns returns successfull response when user details are retrieved successfully
*/
	async getDetailst(req, res) {
		try {


			logger.info('Inside profilecontroller: getDetailst method');

			console.log(typeof (req.params.taskId), "typeeeeeeeeeeeeeeeeeeeeeeeee")

			const response = await profileservice.getDetailst(req.payload.user._id, req.params.taskId);

			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				data: response.data,
				status: response.status
			});
		}
		catch (error) {

			logger.error(`Inside profilecontroller:  updatedetails method: Error occured while getting  users Details ${error.message}`);
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

module.exports = new profilecontoller();
