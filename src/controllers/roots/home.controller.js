/** 
 * API root or home controller
 * 
 * @memberof module:controllers/roots
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 * @returns - Returns HTTP response body
 */
const home = async (request, response, next) => {
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

export { home };
export default home;
