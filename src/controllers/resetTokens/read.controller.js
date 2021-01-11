import { resources, statusCodes } from '../../configs';
import { resetTokens as resetTokensService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Read all reset token records.
 *
 * @memberof module:controllers/resetTokens
 * @param {Object} request HTTP request object.
 * @param {Object} response HTTP response object callback.
 * @param {Object} next Call the next route handler.
 * @returns Returns a http response body.
 * @throws Will throw an error if no foundResetTokens is created.
 */
const readAll = async (request, response, next) => {
  try {
    // Parse query strings
    const { size, page, filter } = request.query;

    // TODO: provide an application setting for this
    // Set default database limit and offset
    const limit = size ? size : 10;
    const offset = page ? page * limit : 0;

    // Resource being created. We use this to check authorization later.
    const RESET_TOKENS = resources.RESET_TOKENS;
    // User requesting the action
    const requestUser = request.user;

    // Check authorizations
    const isOwn = authorizations.can(requestUser.role).readOwn(RESET_TOKENS);
    const isAny = authorizations.can(requestUser.role).readAny(RESET_TOKENS);

    // Throw error if no authorizations are allowed
    if (!isAny.granted && !isOwn.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} on resource ${RESET_TOKENS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Filter query where
    let where = {};

    // Apply filter if user can only view own resources
    if (isOwn.granted && !isAny.granted) {
      where.UserId = requestUser.id;
    }

    // Find all user records
    const foundResetTokens = await resetTokensService.findAll(offset, limit, where);

    // Check if we user records to return
    if (!foundResetTokens) {
      const error = new Error('CONTROLLER ERROR: No reset token records found.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Found users response
    const responseBody = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: 'SUCCESS: Retrieved all reset token records.',
      data: foundResetTokens,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

/**
 * Read all reset token records
 *
 * @memberof module:controllers/resetTokens
 * @param {Object} request HTTP request object
 * @param {Object} response HTTP response object callback
 * @param {Object} next Call the next route handler
 * @returns Returns a http response body.
 * @throws Will throw an error if no request.params are present.
 * @throws Will throw an error if no request.params.id is present.
 * @throws Will throw an error if foundResetToken is not created.
 */
const readOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const RESET_TOKENS = resources.RESET_TOKENS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check there are request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your read one reset token request did not contain any params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

    // Check we have an id to find
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your read one reset token request did not contain an id.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Find thing with primary key id
    const foundResetToken = await resetTokensService.findOneByPk(id);

    // Check we have a thing record to respond with
    if (!foundResetToken) {
      const error = new Error(`CONTROLLER ERROR: Unable to read reset token ${id} record.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Check if requestUser.id equals UserId for reset token
    const isPermission =
      requestUser.id === foundResetToken.UserId
        ? // If they equal set authorisation for read Own
          authorizations.can(requestUser.role).readOwn(RESET_TOKENS)
        : // If they do not equal set authorisation for read any
          authorizations.can(requestUser.role).readAny(RESET_TOKENS);

    // Check if permission is grated, throw error if not granted
    if (!isPermission.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${RESET_TOKENS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Find thing response
    const responseBody = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Retrieved reset token ${id} record.`,
      data: foundResetToken,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { readAll, readOne };
export default { all: readAll, one: readOne };
