import passport from 'passport';

/**
 * LOGIN CONTROLLER
 * ------------------
 * Business logic for local login
 *
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @param {OBJECT} next - Express next callback
 */
const login = async (req, res, next) => {
  passport.authenticate('local', async (err, user, info) => {
    try {
      if (err || !user) {
        let error = new Error(info.message || 'AUTHENTICATION ERROR: Unauthorized access.');
        error.statusCode = 401;
        throw error;
      }

      // Custom login so we can do our own error messages
      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        };

        // Generate token for future JWT authentication
        let token = await user.generateToken();

        // Set last login for user to now
        user.lastLogin = new Date();
        await user.save();

        // Respond with generated token
        return res.status(200).json({
          status: 200,
          message: 'SUCCESS: Authentication token generated.',
          token: token,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export default login