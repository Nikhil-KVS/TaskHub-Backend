const settingsservice = require('./settings.service')
const CustomError = require('../error-handlers/custom.error');
const logger = require('../config/logger');

const HTTP_STATUS = require('../constants/http.constants')

class settingscontroller {

	/**
* @method update
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description for updating users mobile number in db.
* @returns returns successfullresponse when mobileNUmber is updated successfullly.
*/
	async update(req, res) {
		try {

			logger.info('Inside settingscontroller: update  method');
			const response = await settingsservice.update(req.body, req.payload.user._id);

			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				status: response.status
			});


		}
		catch (error) {
			this.logger.error(`Inside settingscontroller: update method: Error occured while mobileNumber is not updated ${error.message}`);
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

module.exports = new settingscontroller();