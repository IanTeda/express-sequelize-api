import { logger } from '../../utils';

/**
 * Errors middleware for processing errors passed in by the controllers
 * 
 * @module controllers/errors/middleware
 * @param {Object} error Error passed into the middleware.
 * @param {Object} request HTTP request argument.
 * @param {Object} response HTTP response argument.
 * @param {Object} next Callback argument to the middleware function.
 */
const errorsMiddleware = (error, request, response, next) => {
  //  Log error
  logger.error(error.message);

  // Error response
  response
    .status(error.statusCode || 500)
    .json({
      status: error.statusCode || 500,
      message: error.message || 'REQUEST ERROR',
    });
};

export { errorsMiddleware }
