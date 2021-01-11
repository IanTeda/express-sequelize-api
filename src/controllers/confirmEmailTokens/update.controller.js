import { resources, statusCodes } from '../../configs';
import { confirmEmailTokens as confirmEmailTokensService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Update a request token record.
 *
 * @memberof module:controllers/confirmEmailTokens
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object callback.
 * @param {Object} next - Call the next route callback handler.
 * @returns - Will return a http response body
 * @throws - Will throw an error if no request.params is passed in.
 * @throws - Will throw an error if no request.params.id is passed in.
 * @throws - Will throw an error if no request.body is passed in.
 * @throws - Will throw an error if no updatedResetToken is created.
 */
const updateOne = async (request, response, next) => {
  try {
    // Role of user requesting action
    const user = request.user;
    const CONFIRM_EMAIL_TOKENS = resources.CONFIRM_EMAIL_TOKENS;

    // Check we have request params
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your update a confirm email token request did not contain any request params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse params id
    const id = Number(request.params.id);

    // Check we have a user primary key id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your update a confirm email token request did not contain an id param.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Check we have a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your update a confirm email token request did not contain a request body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse body
    const UserId = Number(request.body.UserId);
    const expiration = Date(request.body.expiration);

    // Check if UserId matches req.user.id and set permission
    const isPermission = (user.id === UserId)
      ? authorizations.can(user.role).updateOwn(CONFIRM_EMAIL_TOKENS)
      : authorizations.can(user.role).updateAny(CONFIRM_EMAIL_TOKENS);

    // Check if permission is grated
    if (!isPermission.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} on resources ${resources.CONFIRM_EMAIL_TOKENS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Update data
    const updateTokenData = {
      UserId: UserId,
      expiration: expiration,
    };

    // Update user record
    const updatedToken = await confirmEmailTokensService.updateOneByPk(id, updateTokenData);

    // Check we have an updated user record
    if (!updatedToken) {
      const error = new Error(`CONTROLLER ERROR: Unable to update confirm email token ${id} record.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Return updated user data
    const responseBody = response.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `SUCCESS: Updated reset token ${id} record.`,
      data: updatedToken,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { updateOne };
export default { one: updateOne };
