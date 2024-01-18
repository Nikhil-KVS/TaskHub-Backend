

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
// const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./src/config/config');
const morgan = require('./src/config/morgan');
const logger=require('./src/config/logger')

const routes = require('./src/routes/v1/index');


const app = express();

if (config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());


app.use(bodyParser.json(''));
app.use(bodyParser.urlencoded({ extended: true }));


// jwt authentication for passport js
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
    app.use('/v1/auth', authLimiter);
}

//v1 api routes
app.use('/v1', routes);



//
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });





// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new Error(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
//app.use(errorConverter);

// handle error
//app.use(errorHandler);

module.exports = app;