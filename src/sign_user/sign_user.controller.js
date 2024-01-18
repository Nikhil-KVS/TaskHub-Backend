const signuser = require('./sign_user.service')
const CustomError = require('../error-handlers/custom.error');

const HTTP_STATUS = require('../constants/http.constants')
const logger = require('../config/logger');


class signusercontroller {

	/**
* @method signupNewUser
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description to take user details for signup
* @returns returns successfull response  when userdetails are added successfully
*/
	async signupNewUser(req, res) {
		try {
			logger.info('Inside  signupNewUsercontroller: signupNewUser method');
			const response = await signuser.signup(req.body)

			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.CREATED).json({
				message: response.message,
				status: response.status
			});

		}
		catch (error) {
			logger.error(`Inside signusercontroller : signupNewUser  method: Error occured while  user is signing up ${error.message}`);
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
* @method signinUser
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description to take user details for sigin
* @returns returns successfull response  when userdetails are added successfully
*/

	async signinUser(req, res) {
		try {

			logger.info('Inside  signinUsercontroller: signinUser method');
			const response = await signuser.signinUser(req.body)

			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				data: response.data,
				status: response.status
			});

		}
		catch (error) {
			logger.error(`Inside signusercontroller : signinUser method: Error occured while saving user is signing ${error.message}`);
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


module.exports = new signusercontroller()