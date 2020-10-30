import { resetTokens as resetTokensService, users as usersService } from '../../services';

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
    // Check we have a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your create reset-token request did not contain a request body.');
      error.statusCode = 501;
      throw error;
    }

    // Parse the request body
    const { email } = request.body;

    // Check we have a request token email
    if (!email) {
      const error = new Error('CONTROLLER ERROR: Your create reset-token request did not contain an email in the request body.');
      error.statusCode = 501;
      throw error;
    }

    const user = await usersService.findOneByEmail(email);

    // Check we have a request suer instance
    if (!user) {
      const error = new Error('CONTROLLER ERROR: Unable to find user for the email provided.');
      error.statusCode = 501;
      throw error;
    }

    // Set UserId to create token for
    const UserId = user.id;

    // Create a new reset token
    const createdResetToken = await resetTokensService.createOne(UserId);

    // Check we have a created reset token record
    if (!createdResetToken) {
      const error = new Error('CONTROLLER ERROR: Unable to create reset token.');
      error.statusCode = 501;
      throw error;
    }

    // Created response body
    const responseBody = response.status(201).json({
      status: 201,
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
