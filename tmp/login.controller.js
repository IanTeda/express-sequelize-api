import passport from 'passport';

/**
 * Business logic for local passport login
 *
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object
 * @param {Object} next - Express next callback
 */
const login = async (request, response, next) => {
  passport.authenticate('local', async (error, user, info) => {
    try {
      if (error || !user) {
        let error = new Error(info.message || 'AUTHENTICATION ERROR: Unauthorized access.');
        error.statusCode = 401;
        throw error;
      }

      // Custom login so we can do our own error messages
      request.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        };

        // Generate token for future JWT authentication
        let token = await user.generateToken();

        // Set last login for user to now
        user.lastLogin = new Date();
        await user.save();

        // Respond with generated token
        const responseBody = response.status(200).json({
          status: 200,
          message: 'SUCCESS: Authentication token generated.',
          token: token,
        });
      });

      return responseBody;
    } catch (error) {
      return next(error);
    }
  })(request, response, next);
};

export default login
