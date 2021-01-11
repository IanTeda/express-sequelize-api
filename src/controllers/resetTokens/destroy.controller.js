import { resources, statusCodes } from '../../configs';
import { resetTokens as resetTokenService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Destroy reset token record with primary key id
 *
 * @memberof module:controllers/resetTokens
 * @param {Object} request HTTP request object.
 * @param {Object} response HTTP response object callback.
 * @param {Object} next Next route callback handler.
 * @returns {Object} Returns a http response object
 * @throws Will throw an error if no request.params are provided.
 * @throws Will throw an error if no primary key id is provided in the request.params.
 * @throws Will throw an error if no destroyedCount is created.
 */
const destroyOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const RESET_TOKENS = resources.RESET_TOKENS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check we have request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your request to destroy one reset token did not contain any params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

    // Check we have an id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your request to destroy one reset token did not contain an id in the params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Check if email matches req.user.email and set permission
    const isPermission = requestUser.id === id 
      ? authorizations.can(requestUser.role).deleteOwn(RESET_TOKENS) 
      : authorizations.can(requestUser.role).deleteAny(RESET_TOKENS);

    // Check if permission is grated
    if (!isPermission.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} on resources ${RESET_TOKENS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Count rows destroyed
    const destroyedCount = await resetTokenService.destroyOneByPk(id);

    // Check we have row count to respond with
    if (!destroyedCount) {
      const error = new Error(`CONTROLLER ERROR: Unable to destroy reset token ${id} record.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Destroy response
    const responseBody = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Destroyed reset token ${id} record.`,
      count: destroyedCount,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

/**
 * Will destroy reset tokens that are past now.
 *
 * @memberof module:controllers/resetTokens
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object callback.
 * @param {Object} next - Next route callback handler.
 * @returns Will return a http response body.
 * @throws Will throw an error if no destroyedCount created.
 */
const destroyExpired = async (request, response, next) => {
  try {
    const destroyedCount = await resetTokenService.destroyExpiredTokens();

    if (!destroyedCount) {
      const error = new Error('CONTROLLER ERROR: No reset token records destroyed.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Destroy response
    const responseBody = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Destroyed expired reset token records.`,
      count: destroyedCount,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { destroyOne, destroyExpired };
export default { one: destroyOne, expired: destroyExpired };
