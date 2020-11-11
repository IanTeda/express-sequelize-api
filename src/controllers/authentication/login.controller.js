import passport from 'passport';

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
  passport.authenticate('local', async (error, user, info) => {
    try {
      if (error || !user) {
        const error = new Error(info.message || 'AUTHENTICATION ERROR: Unauthorized access.');
        error.statusCode = 401;
        throw error;
      }

      // Custom login so we can do our own error messages
      request.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        // Only log user in if email address has been confirmed
        if (!user.isEmailConfirmed) {
          const error = new Error('AUTHENTICATION ERROR: User email address has not been confirmed yet.');
          error.statusCode = 401;
          return next(error);
        }

        // Generate token for future JWT authentication
        const token = await user.generateJWT();

        // Set last login for user to now
        user.lastLogin = new Date();
        await user.save();

        // Respond with generated token
        const responseBody = response.status(201).json({
          status: 201,
          message: 'SUCCESS: JSON Web Token generated.',
          token: token,
        });

        return responseBody;
      });
    } catch (error) {
      return next(error);
    }
  })(request, response, next);
};

export { login };
export default login;
