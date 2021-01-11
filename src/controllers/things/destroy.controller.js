import { resources, statusCodes } from '../../configs';
import { things as thingsService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Destroy thing record with primary key id
 *
 * @memberof module:controllers/things
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const destroyOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const THINGS = resources.THINGS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check if email matches req.user.email and set permission
    const isAny = authorizations.can(requestUser.role).deleteAny(THINGS);

    // Check if permission is grated
    if (!isAny.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${THINGS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Check we have request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your destroy thing request did not contain any params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

    // Check we have an id to update
    if (!id) {
      console.log(id);
      const error = new Error('CONTROLLER ERROR: Your destroy thing request did not contain a thing id.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Count rows destroyed
    const countRowsDestroyed = await thingsService.destroyOneByPk(id);

    // Check we have row count to respond with
    if (!countRowsDestroyed) {
      const error = new Error(`CONTROLLER ERROR: Unable to destroy thing ${id} record.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Destroy response
    const responseObject = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Destroyed thing ${id} record.`,
      count: countRowsDestroyed,
    });

    return responseObject;
  } catch (error) {
    next(error);
  }
};

/**
 * Destroy all things in the database
 *
 * @memberof module:controllers/things
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object callback
 * @param {Object} next - Call the next route callback handler
 */
const destroyAll = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const THINGS = resources.THINGS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check if email matches req.user.email and set permission
    const isAny = authorizations.can(requestUser.role).deleteAny(THINGS);

    // Check if permission is grated
    if (!isAny.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${THINGS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Count the rows destroyed
    const countRowsDestroyed = await thingsService.destroyAll();

    // Check we have a row count to respond with
    if (!countRowsDestroyed) {
      const error = new Error(`CONTROLLER ERROR: Unable to destroy things.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Destroy all response
    const responseObject = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Destroyed thing ${countRowsDestroyed} records.`,
      count: countRowsDestroyed,
    });

    return responseObject;
  } catch (error) {
    next(error);
  }
};

export { destroyOne, destroyAll };
export default { one: destroyOne, all: destroyAll };
