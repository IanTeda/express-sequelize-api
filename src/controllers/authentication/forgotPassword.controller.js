import { resetTokens as resetTokensService, users as usersService } from '../../services';
import { logger, emailer } from '../../utils';

/**
 * Will destroy reset tokens that are past now.
 *
 * @memberof module:controllers/authentication
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object callback.
 * @param {Object} next - Next route callback handler.
 * @returns - Will return a http response body with a message confirming token emailed.
 * @returns - WIll return an error message if there is no request.body.
 * @returns - Will return an error message if no email provided.
 * @returns - Will return an error message if user cannot be found for the email address.
 * @returns - Will return an error message if previous reset tokens can not be updated as used for user requesting.
 * @returns - Will return an error message if a reset token cannot be generated.
 * @returns - Will return an error message if the reset token email cannot be sent.
 */
const forgotPassword = async (request, response, next) => {
  try {

    // Check we have a request body
    if (!request.body) {
      throw new Error('AUTHENTICATION ERROR: Forgot password request body is empty.');
    }

    // Parse request body
    const { email } = request.body;

    // Check we have an email
    if (!email) {
      throw new Error('AUTHENTICATION ERROR: Forgot password request has no user email.');
    }

    // Check email exists
    const user = await usersService.findOneByEmail(email);

    // Update all reset tokens for given id
    const isTokensSetUsed = await resetTokensService.updateUsedByUserId(user.id);

    if (!isTokensSetUsed) throw new Error('AUTHENTICATION ERROR: Reset tokens could not be set as used.');

    // Get reset token
    const createdResetToken = await resetTokensService.createOne(user.id);

    // Check we have a token
    if (!createdResetToken) {
      throw new Error('AUTHENTICATION ERROR: Forgot password reset token not generated.');
    }

    // Recipient details
    const name = user.firstName;
    const emailAddress = email;
    const token = createdResetToken.token;

    // Send email
    const emailResponse = await emailer.forgotEmail(name, emailAddress, token);

    // Check we have an email response
    if (!emailResponse) throw new Error('AUTHENTICATION ERROR: Forgot reset email could not be sent.');

    // API response
    const responseBody = response.status(200).json({
      status: 200,
      message: `SUCCESS: Reset token sent to <${email}>.`,
    });

    return responseBody;
  } catch (error) {

    // Log error message since we are not passing them on
    logger.debug(error.message);

    // Send consistent error message to limit attack vectors
    const responseBody = response.status(400).json({
      status: 400,
      message: `FORGOT PASSWORD ERROR: Reset token was not sent.`,
    });

    return responseBody;
  }
};

export { forgotPassword };
export default forgotPassword;
