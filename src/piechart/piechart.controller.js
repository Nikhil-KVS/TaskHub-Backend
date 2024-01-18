

const CustomError = require('../error-handlers/custom.error')

const Default = require('../config/Default');

const piechartservice = require('../piechart/piechart.service');

const HTTP_STATUS = require('../constants/http.constants')
const logger = require('../config/logger');


class piechartcontoller extends Default {
	constructor() {
		super();
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


			logger.info('Inside piechartcontroller: getDetailst method');

			console.log(req.payload.user._id, "mounii")
			console.log(req.query.taskId, "mounik")

			const response = await piechartservice.getDetailst(req.payload.user._id, req.query.taskId);

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

module.exports = new piechartcontoller();