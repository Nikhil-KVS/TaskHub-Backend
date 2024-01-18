
const { createLogger, format, transports } = require('winston');
class Default {
	constructor() {
		this.error = 'Internal Server Error! Please Try Again.';
        // this.logger = this.logger();

	}
	/**
   * @method logger static method to access without class initialize
   * @returns looger method with different verbose levele
   */
	logger() {
		const logger = createLogger({
			format: combine(timestamp(), errors({ stack: true }), myFormat, json()),
			defaultMeta: { meta: '' },
			transports: [new transports.Console()],

		});
		this.logger = logger;
		return logger;
	}
}

module.exports = Default;