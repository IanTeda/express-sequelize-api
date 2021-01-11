import { resources, statusCodes } from '../../configs';
import { confirmEmailTokens as confirmEmailTokensService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Destroy confirm email token record with primary key id
 *
 * @memberof module:controllers/confirmEmailTokens
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object callback.
 * @param {Object} next - Next route callback handler.
 * @returns {Object} Returns a http response object
 * @throws - Will throw an error if no request.params are provided.
 * @throws - Will throw an error if no primary key id is provided in the request.params.
 * @throws - Will throw an error if no destroyedCount is created.
 */
const destroyOne = async (request, response, next) => {
  try {
    // Role of user requesting action
    const user = request.user;

    // Check authorizations
    const isAny = authorizations.can(user.role).deleteAny(resources.CONFIRM_EMAIL_TOKENS);
    const isOwn = authorizations.can(user.role).deleteOwn(resources.CONFIRM_EMAIL_TOKENS);

    // Throw error if no authorizations are allowed
    if (!isAny.granted && !isOwn.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} on resource ${resources.CONFIRM_EMAIL_TOKENS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Check we have request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your request to destroy a confirm email token did not contain any params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

    // Check we have an id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your request to destroy a confirm email token did not contain an id in the params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Find user to check user.id for own authorization
    const userToDestroy = await confirmEmailTokensService.findOneByPk(id);

    if (isOwn.granted && !isAny.granted && !userToDestroy.id !== user.id) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} on resource ${resources.CONFIRM_EMAIL_TOKENS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Count rows destroyed
    const destroyedCount = await confirmEmailTokensService.destroyOneByPk(id);

    // Check we have row count to respond with
    if (!destroyedCount) {
      const error = new Error(`CONTROLLER ERROR: Unable to destroy confirm email token ${id} record.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Destroy response
    const responseBody = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Destroyed confirm email token ${id} record.`,
      count: destroyedCount,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

/**
 * Will destroy confirm email tokens that are past now.
 *
 * @memberof module:controllers/confirmEmailTokens
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object callback.
 * @param {Object} next - Next route callback handler.
 * @returns Will return a http response body.
 * @throws Will throw an error if no destroyedCount created.
 */
const destroyExpired = async (request, response, next) => {
  try {
    const destroyedCount = await confirmEmailTokensService.destroyExpiredTokens();

    if (!destroyedCount) {
      const error = new Error('CONTROLLER ERROR: No expired confirm email token records destroyed.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Destroy response
    const responseBody = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Destroyed expired confirm email token records.`,
      count: destroyedCount,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { destroyOne, destroyExpired };
export default { one: destroyOne, expired: destroyExpired };
