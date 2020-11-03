import { resetToken as resetTokenService, users as usersService } from '../../services';
import { logger } from '../../utils';

/**
 * My Middleware
 * @name MyMiddleWare
 * @function
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const resetPassword = async (req, res, next) => {
  try {
    // Set query values
    const { email, token } = req.query;
    // Set request body values
    const { password1, password2 } = req.body;

    // Return error if we don't have the parameters needed
    if (!email || !token || !password1 || !password2) {
      let err = new Error('RESET ERROR: Request did not contain enough parameters.');
      err.status = 501;
      throw err;
    }

    // Check email and token match database
    const isTokenValid = resetTokenService.validateToken(email, token);

    if (!isTokenValid) {
      let err = new Error('RESET ERROR: Invalid email and/or password.');
      err.status = 501;
      throw err;
    }

    // Check reset passwords match
    if (password1 !== password2) {
      let err = new Error('RESET ERROR: Confirmation password does not match.');
      err.status = 501;
      throw err;
    }

    //TODO validate password rules

    // Set tokens used by email
    resetTokenService.updateTokensUsedByEmail(email);

    // Set password to update
    const userData = {
      password: password1,
    };

    // Update user in database
    const updatedUser = await usersService.updateByEmail(email, userData);

    // Check we have an updated user instance
    if (!updatedUser) {
      let err = new Error('RESET ERROR: Unable to update password.');
      err.statusCode = 501;
      throw err;
    }

    // Return API response
    return res.status(201).json({
      status: 201,
      message: `RESET SUCCESS: User ${updatedUser.email} password has been reset.`,
    });
  } catch (err) {

    // Log error message since we are not passing them on
    logger.error(err.message);

    // Send consistent error message to limit attack vectors
    return res.status(401).json({
      status: 401,
      message: `RESET FAILURE: Email or token could not be authenticated`,
    });
  }
};

export default resetPassword;