/**
 * 404 Not Found controller module
 * 
 * @memberof module:middleware/errors
 * @param {Object} request    HTTP request argument.
 * @param {Object} response   HTTP response argument.
 * @param {Object} next       Callback argument to the middleware function.
 */
const notFound = (request, response, next) => {
  const error = new Error(`NOT FOUND: Endpoint (${request.method}) '${request.originalUrl}' not found.`);
  error.statusCode = 404;
  next(error)
};

export { notFound };
