import passport from 'passport';

/**
 * Authenticate local login request
 *
 * @module middleware/authenticate
 * @param {Object} request      HTTP Request object
 * @param {Object} response     HTTP Response object
 * @param {Object} next         Next middleware callback
 */
const authenticate = async (request, response, next) => {
  passport.authenticate('local', async (error, user, info) => {
    try {
      if (error || !user) {
        const error = new Error(info.message || 'AUTHENTICATION ERROR: Unauthorized access.');
        error.statusCode = 401;
        throw error;
      }

      // Custom callback so we can add user to the request object and customise the error message
      request.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        return next();
      });
    } catch (error) {
      let message;
      if (error.message.split(':')[0] === 'SERVICE ERROR') {
        message = 'AUTHENTICATION ERROR: Unauthorized access.';
      }
      return next(error);
    }
  })(request, response, next);
};

export { authenticate };
export default authenticate;
