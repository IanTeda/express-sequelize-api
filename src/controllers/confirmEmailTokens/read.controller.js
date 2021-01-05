import { resources } from '../../configs';
import { confirmEmailTokens as confirmEmailTokensService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Read all confirm email token records.
 *
 * @memberof module:controllers/confirmEmailTokens
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object callback.
 * @param {Object} next - Call the next route handler.
 * @returns - Will return a http response body.
 * @throws - Will throw an error if no foundResetTokens is created.
 */
const readAll = async (request, response, next) => {
  try {

    // Role of user requesting action
    const user = request.user;

    // Check authorizations
    const isAny = authorizations.can(user.role).readAny(resources.CONFIRM_EMAIL_TOKENS);
    const isOwn = authorizations.can(user.role).readOwn(resources.CONFIRM_EMAIL_TOKENS);

    // Throw error if no authorizations are allowed
    if (!isAny.granted && !isOwn.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} on resource ${resources.CONFIRM_EMAIL_TOKENS}.`);
      error.statusCode = 401;
      throw error;
    }

    // Parse query strings
    const { size, page, filter } = request.query;

    // TODO: provide an application setting for this
    // Set default database limit and offset
    const limit = size ? size : 10;
    const offset = page ? page * limit : 0;

    // Filter query where
    let where = {};

    // Apply filter if user can only view own resources
    if (isOwn.granted && !isAny.granted) {
      where.UserId = user.id;
    }

    // Find all user records
    const foundTokens = await confirmEmailTokensService.findAll(offset, limit, where);

    // Check if we user records to return
    if (!foundTokens) {
      const error = new Error('CONTROLLER ERROR: No confirm email token records found.');
      error.statusCode = 500;
      throw error;
    }

    // Found users response
    const responseBody = response.status(200).json({
      status: 200,
      message: 'SUCCESS: Retrieved all confirm email token records.',
      data: foundTokens,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

/**
 * Read all confirm email token records
 *
 * @memberof module:controllers/confirmEmailTokens
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object callback
 * @param {Object} next - Call the next route handler
 * @returns - Will return a http response body.
 * @throws Will throw an error if no request.params are present.
 * @throws Will throw an error if no request.params.id is present.
 * @throws Will throw an error if foundResetToken is not created.
 */
const readOne = async (request, response, next) => {
  try {

    // User in the request body
    const user = request.user;

    // Resource being requested
    const CONFIRM_EMAIL_TOKENS = resources.CONFIRM_EMAIL_TOKENS

    // Parse params id
    const id = Number(request.params.id);

    // Check we have an id to find
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your read a confirm email token request did not contain an id.');
      error.statusCode = 400;
      throw error;
    }

    // Find thing with primary key id
    const foundToken = await confirmEmailTokensService.findOneByPk(id);

    // Check we have a thing record to respond with
    if (!foundToken) {
      const error = new Error(`CONTROLLER ERROR: Unable to read confirm email token ${id} record.`);
      error.statusCode = 500;
      throw error;
    }

    // Check if UserId matches req.user.id and set permission
    const isPermission = (user.id === foundToken.UserId)
      ? authorizations.can(user.role).readOwn(CONFIRM_EMAIL_TOKENS)
      : authorizations.can(user.role).readAny(CONFIRM_EMAIL_TOKENS);

    // Check if permission is grated
    if (!isPermission.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${resources.CONFIRM_EMAIL_TOKENS}.`);
      error.statusCode = 401;
      throw error;
    }

    // Find thing response
    const responseBody = response.status(200).json({
      status: 200,
      message: `SUCCESS: Retrieved confirm email token ${id} record.`,
      data: foundToken,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { readAll, readOne };
export default { all: readAll, one: readOne };
