/**
 * Custom class to handle errors
 */
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = CustomError;