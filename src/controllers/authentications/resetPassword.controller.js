import { resetTokens as resetTokensService, users as usersService } from '../../services';
import { logger } from '../../utils';

/**
 * Reset password for email address if User.Id and token match the database and is not expired
 *
 * @memberof module:controllers/authentication
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object callback.
 * @param {Object} next - Next route callback handler.
 * @returns - Will return a http response body.
 * @returns - Will return an error if no request query is sent.
 * @returns - Will return an error is there is no email or no token or no password.
 * @returns - Will return an error if a user cannot be found for the email address.
 * @returns - Will return an error if the email and token can not be validated.
 * @returns - Will return an error if password1 does not match password 2.
 */
const resetPassword = async (request, response, next) => {
  try {

    if(!request.query) {
      const error = new Error('RESET ERROR: Request did not contain a query.');
      error.status = 501;
      throw error;
    }

    // Set query values
    const { token } = request.query;
    // Set request body values
    const { email, password1, password2 } = request.body;

    // Return error if we don't have the parameters needed
    if (!email || !token || !password1 || !password2) {
      const error = new Error('RESET ERROR: Request did not contain enough parameters.');
      error.status = 501;
      throw error;
    }

    // Find user we are looking to reset password for
    const user = await usersService.findOneByEmail(email);

    // Check we have a user instance to update
    if (!user) {
      const error = new Error('RESET ERROR: Requested email could not be found.');
      error.status = 500;
      throw error;
    }

    // Set UserId from found user instance for completeness
    const UserId = user.id;

    // Check email and token match database
    const isTokenValid = await resetTokensService.validateToken(UserId, token);

    // Check we have a valid token
    if (!isTokenValid) {
      const error = new Error('RESET ERROR: Invalid email and/or password.');
      error.status = 501;
      throw error;
    }

    // Check reset passwords match
    // TODO: not sure if this should be in the API?
    if (password1 !== password2) {
      const error = new Error('RESET ERROR: Confirmation password does not match.');
      error.statusCode = 501;
      throw error;
    }

    //TODO validate password rules

    // Set tokens used by email
    await resetTokensService.updateUsedByUserId(UserId);

    // Set password to update
    const userData = {
      password: password1,
    };

    // Update user in database
    const updatedUser = await usersService.updateOneByPk(UserId, userData);

    // Check we have an updated user instance
    if (!updatedUser) {
      let err = new Error('RESET ERROR: Unable to update password.');
      err.statusCode = 501;
      throw err;
    }

    // Return API response
    const responseBody = response.status(201).json({
      status: 201,
      message: `RESET SUCCESS: Password reset for ${updatedUser.email}.`,
    });

    return responseBody;
  } catch (error) {
    // Log error message since we are not passing them on
    logger.debug(error.message);

    // console.log(error)

    // Send consistent error message to limit attack vectors
    const responseBody = response.status(401).json({
      status: 401,
      message: `RESET FAILURE: Email or token could not be authenticated.`,
    });

    return responseBody;
  }
};

export { resetPassword };
export default resetPassword;
