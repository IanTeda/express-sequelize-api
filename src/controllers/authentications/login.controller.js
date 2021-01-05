/**
 * API login controller for local username and password authentication
 *
 * @memberof module:controllers/authentication
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 * @returns - Returns HTTP response body
 */
const login = async (request, response, next) => {

  try {

    // Get logged in user from the request object
    const loggedInUser = request.user;

    // Generate jwt token for logged in user.
    const jwt = await loggedInUser.generateJWT();

    // Set last login for user to now
    loggedInUser.lastLogin = new Date();
    await loggedInUser.save();

    const responseBody = response.status(201).json({
      status: 201,
      message: 'SUCCESS: JSON Web Token generated.',
      token: jwt,
    });
  
    return responseBody;
  
  } catch (error) {
    next(error);
  }
};

export { login };
export default login;
