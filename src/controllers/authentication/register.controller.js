/** 
 * Register as a new user
 * 
 * @memberof module:controllers/authentication
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 * @returns - Returns HTTP response body
 */
const register = async (request, response, next) => {
  try {
    const responseBody = response.status(501).json({
      status: 501,
      message: `NOT IMPLEMENTED: Endpoint (${request.method}) '${request.originalUrl}' not available.`,
    });
    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { register };
export default register;
