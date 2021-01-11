import { resources, statusCodes } from '../../configs';
import { users as usersService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Destroy a user
 *
 * @memberof module:controllers/users
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 * @returns Returns a http response body
 * @throws Will throw an error if no request.params is passed in
 * @throws Will throw an error if no request.params.id is passed in
 */
const destroyOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const USERS = resources.USERS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check if req.user is allowed to create users
    const isAny = authorizations.can(requestUser.role).deleteAny(USERS);

    // Check if permission is grated
    if (!isAny.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${USERS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Check we have request params
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your destroy one user request did not contain any params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

    // Check we have a primary key id to destroy
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your destroy one user request did not contain a id.');
      error.statusCode = 400;
      throw error;
    }

    // Count how many rows we destroy
    const countRowsDestroyed = await usersService.destroyByPk(id);

    // Check we have a count of rows destroyed
    if (!countRowsDestroyed) {
      const error = new Error(`CONTROLLER ERROR: Unable to destroy user ${id} record.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Respond with rows deleted
    const responseBody = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Destroyed user ${id} record.`,
      count: countRowsDestroyed,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

/**
 * Destroy all users in the database
 *
 * @memberof module:controllers/users
 * @param {Object} request HTTP request object.
 * @param {Object} response HTTP response object callback.
 * @param {Object} next Call the next route callback handler.
 * @returns Will return a count of the users destroyed.
 * @throws Will throw an error if no destroyedUsersCount is created.
 */
const destroyAll = async (request, response, next) => {
  try {
    // Count the rows destroyed
    const destroyedUsersCount = await usersService.destroyAll();

    // Check we have a row count to respond with
    if (!destroyedUsersCount) {
      const error = new Error(`CONTROLLER ERROR: Unable to destroy all users.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Destroy all response
    const responseObject = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Destroyed ${destroyedUsersCount} user records.`,
      count: destroyedUsersCount,
    });

    return responseObject;
  } catch (error) {
    next(error);
  }
};

export { destroyOne, destroyAll };
export default { one: destroyOne, all: destroyAll };
