import { resources, statusCodes } from '../../configs';
import { confirmEmailTokens as confirmEmailTokensService, users as usersService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Create and email a token for confirming a users email address.
 *
 * @memberof module:controllers/confirmEmailTokens
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object callback
 * @param {Object} next - Call the next route handler
 * @returns - A http response body
 * @throws - Will throw an error if no request.body is present
 * @throws - Will throw an error if no request.body.email is present
 */
const createOne = async (request, response, next) => {
  try {
    // User instance requesting controller
    const requestUser = request.user;
    // Confirm email tokens resource
    const CONFIRM_EMAIL_TOKENS = resources.CONFIRM_EMAIL_TOKENS;

    // Check we have a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your create email confirmation token request did not contain a request body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse the request body
    const { email } = request.body;

    // Check we have a request token email
    if (!email) {
      const error = new Error('CONTROLLER ERROR: Your create email confirmation token request did not contain an email in the request body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Check if email matches req.user.email and then set permission to check
    const isPermission = requestUser.email === email 
      ? authorizations.can(requestUser.role).createOwn(CONFIRM_EMAIL_TOKENS) 
      : authorizations.can(requestUser.role).createAny(CONFIRM_EMAIL_TOKENS);

    // Check if permission is grated
    if (!isPermission.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${CONFIRM_EMAIL_TOKENS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Get user to create confirm token for
    const foundUser = await usersService.findOneByEmail(email);

    // Check we have a request suer instance
    if (!foundUser) {
      const error = new Error('CONTROLLER ERROR: Unable to find user for the email provided in email confirmation token request.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Set UserId to create token for
    const UserId = foundUser.id;

    // Create a new reset token
    const createdToken = await confirmEmailTokensService.createOne(UserId);

    // Check we have a created reset token record
    if (!createdToken) {
      const error = new Error('CONTROLLER ERROR: Unable to create confirmation email token.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Created response body
    const responseBody = response.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `SUCCESS: Confirm email token ${createdToken.id} created.`,
      data: createdToken,
    });

    return responseBody;
  } catch (error) {
    // Pass on caught error
    next(error);
  }
};

export { createOne };
export default { one: createOne };
