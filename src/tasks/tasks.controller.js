const userTasks = require('./tasks.service')
const CustomError = require('../error-handlers/custom.error');
const logger = require('../config/logger');

const HTTP_STATUS = require('../constants/http.constants')

class taskscontroller {

	/**
* @method gettasks
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description to retrieve users  tasks from db
* @returns returns successfull response when tasks details  are retrieved successfully
*/
	async gettasks(req, res) {
		try {
			logger.info('Inside  taskscontroller: gettasks method');

			const response = await userTasks.gettasks(req.payload.user._id, req.query.offset, req.query.limit, req.query.status, req.payload.user.role, req.query.taskId);

			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				data: response.data,
				count: response.count,
				status: response.status,
				role: response.role
			});

		}
		catch (error) {

			// logger.error(`Inside taskscontroller : gettasks method: Error occured while retrieving users task ${error.message}`);
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
* @method savetasks
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description for adding of tasks in db
* @returns returns successfull response when tasks details  are addded successfully
*/

	async savetasks(req, res) {
		try {

			logger.info('Inside  taskscontroller: savetasks method');
			const response = await userTasks.savetasks(req.body, req.payload.user._id)



			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				status: response.status
			});

		}
		catch (error) {

			logger.error(`Inside taskscontroller : savetasks method: Error occured while saving users task ${error.message}`);
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
* @method updatetasks
* @param {*} req express request handler to handle requests
* @param {*} res res express response handler to handle response
* @description for updating  of tasks in db
* @returns returns successfull response when tasks details  are updated successfully
*/
	async updatetasks(req, res) {
		try {

			logger.info('Inside  taskscontroller: updatetasks method');
			const response = await userTasks.updatetasks(req.params.taskId, req.body)

			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				status: response.status
			});

		}
		catch (error) {

			logger.error(`Inside taskscontroller : updatetasks method: Error occured while updating users task ${error.message}`);
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
   * @method gettasksById
   * @param {*} req express request handler to handle requests
   * @param {*} res res express response handler to handle response
   * @description for updating  of tasks in db
   * @returns returns successfull response when particular  user id details are retrieved successfully.
   */
	async gettasksById(req, res) {
		try {

			logger.info('Inside  taskscontroller: gettasksById method');
			const response = await userTasks.gettasksById(req.params.taskId)

			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				status: response.status,
				data: response.data
			});

		}
		catch (error) {

			logger.error(`Inside taskscontroller : gettasksById method: Error occured while updating users task ${error.message}`);
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
	* @method deleteTask
	* @param {*} req express request handler to handle requests
	* @param {*} res res express response handler to handle response
	* @description for updating  of tasks in db
	* @returns returns successfull response when particular  user id details are retrieved successfully.
	*/
	async deleteTask(req, res) {
		try {

			logger.info('Inside  taskscontroller: deleteTask method');
			const response = await userTasks.deleteTask(req.params.taskId)


			if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

			return res.status(HTTP_STATUS.OK).json({
				message: response.message,
				status: response.status,
			});

		}
		catch (error) {

			logger.error(`Inside taskscontroller : deleteTask method: Error occured while updating users task ${error.message}`);
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

module.exports = new taskscontroller()

