import { resources, statusCodes } from '../../configs';
import { resetTokens as resetTokensService, users as usersService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Create a reset token record.
 *
 * @memberof module:controllers/resetTokens
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object callback
 * @param {Object} next - Call the next route handler
 * @returns - A http response body
 * @throws - Will throw an error if no request.body is present
 * @throws - Will throw an error if no request.body.email is present
 */
const createOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const RESET_TOKENS = resources.RESET_TOKENS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check we have a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your create reset-token request did not contain a request body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse the request body for an email address
    const { email } = request.body;

    // Check we have a request token email address to create
    if (!email) {
      const error = new Error('CONTROLLER ERROR: Your create reset-token request did not contain an email in the request body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Check if email matches req.user.email and set permission
    const isPermission = requestUser.email === email ? authorizations.can(requestUser.role).createOwn(RESET_TOKENS) : authorizations.can(requestUser.role).createAny(RESET_TOKENS);

    // Check if permission is grated
    if (!isPermission.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} on resources ${RESET_TOKENS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    const foundUser = await usersService.findOneByEmail(email);

    // Check we have a request suer instance
    if (!foundUser) {
      const error = new Error('CONTROLLER ERROR: Unable to find user for the email provided.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Set UserId to create token for
    const UserId = foundUser.id;

    // Create a new reset token
    const createdResetToken = await resetTokensService.createOne(UserId);

    // Check we have a created reset token record
    if (!createdResetToken) {
      const error = new Error('CONTROLLER ERROR: Unable to create reset token.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Created response body
    const responseBody = response.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `SUCCESS: Reset token ${createdResetToken.id} created.`,
      data: createdResetToken,
    });

    return responseBody;
  } catch (error) {
    // Pass on caught error
    next(error);
  }
};

export { createOne };
export default { one: createOne };
