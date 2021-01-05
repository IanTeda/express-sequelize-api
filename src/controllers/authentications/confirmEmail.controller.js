import { users as usersService, confirmEmailTokens as confirmEmailTokensService } from '../../services';

/** 
 * Confirm email token
 * 
 * @memberof module:controllers/authentication
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 * @returns - Will returns HTTP response body.
 * @throws - Will throw an error if there is no URL query string.
 * @throws - Will throw an error if there is no token query string.
 * @throws - Will throw an error if token is not found in ConfirmEmailToken table.
 * @throws - Will throw an error if user can not be updated to confirm email true.
 */
const confirmEmail = async (request, response, next) => {
  try {

    // Check we have a URL query
    if(!request.query) {
      const error = new Error('CONFIRM EMAIL ERROR: Request did not contain a query.');
      error.status = 400;
      throw error;
    }

    // Set query values
    const { token } = request.query;

    // Return error if we don't have the parameters needed
    if (!token) {
      const error = new Error('CONFIRM EMAIL ERROR: Request did not contain a token.');
      error.status = 400;
      throw error;
    }

    // Check the token is correct
    const foundConfirmEmailToken = await confirmEmailTokensService.findOneByToken(token);

    // Token does not match
    if (!foundConfirmEmailToken) {
      const error = new Error('CONFIRM EMAIL ERROR: Token could not be found.');
      error.status = 500;
      throw error;
    }

    // User primary key ID to update
    const UserId = foundConfirmEmailToken.UserId;

    // Build update user data
    const updateUserData = {
      isEmailConfirmed: true
    };

    // Update user as email being confirmed true
    const updatedUser = await usersService.updateOneByPk(UserId, updateUserData);

    // Check user could be updated
    if (!updatedUser) {
      const error = new Error('CONFIRM EMAIL ERROR: User instance could not be updated to confirm email address.');
      error.status = 500;
      throw error;
    }

    // Build HTTP response body
    const responseBody = response.status(200).json({
      status: 200,
      message: `CONFIRM EMAIL: Email address for user ${UserId} has been confirmed.`,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { confirmEmail };
export default confirmEmail;
