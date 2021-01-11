import { resources, statusCodes } from '../../configs';
import { resetTokens as resetTokensService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Update a request token record.
 *
 * @memberof module:controllers/resetTokens
 * @param {Object} request HTTP request object.
 * @param {Object} response HTTP response object callback.
 * @param {Object} next Call the next route callback handler.
 * @returns Will return a http response body
 * @throws Will throw an error if no request.params is passed in.
 * @throws Will throw an error if no request.params.id is passed in.
 * @throws Will throw an error if no request.body is passed in.
 * @throws Will throw an error if no updatedResetToken is created.
 */
const updateOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const RESET_TOKENS = resources.RESET_TOKENS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check we have request params
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your update one reset token request did not contain any request params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

    // Check we have a user primary key id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your update one reset token request did not contain an id param.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Check if email matches req.user.email and set permission
    const isPermission = requestUser.id === id ? authorizations.can(requestUser.role).updateOwn(RESET_TOKENS) : authorizations.can(requestUser.role).updateAny(RESET_TOKENS);

    // Check if permission is grated
    if (!isPermission.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} on resources ${RESET_TOKENS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Check we have a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your update reset token request did not contain a request body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request body
    const { expiration, isUsed } = request.body;

    // Update data
    const updateResetTokenData = {
      expiration: expiration,
      isUsed: isUsed,
    };

    // Update user record
    const updatedResetToken = await resetTokensService.updateOneByPk(id, updateResetTokenData);

    // Check we have an updated user record
    if (!updatedResetToken) {
      const error = new Error(`CONTROLLER ERROR: Unable to update reset token ${id} record.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Return updated user data
    const responseBody = response.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `SUCCESS: Updated reset token ${id} record.`,
      data: updatedResetToken,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { updateOne };
export default { one: updateOne };
