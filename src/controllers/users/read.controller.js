import { resources, statusCodes } from '../../configs';
import { users as usersService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Read all users within limits, offsets and where filter
 *
 * @memberof module:controllers/users
 * @param {Object} request HTTP request object
 * @param {Object} response HTTP response callback object
 * @param {Object} next Next route handler callback object
 * @returns Returns a response body
 * @throws Will throw an error if no foundUsers created
 */
const readAll = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const USERS = resources.USERS;
    // User instance requesting controller
    const requestUser = request.user;

    const isAny = authorizations.can(requestUser.role).readAny(USERS);

    // Throw error if no authorizations are allowed
    if (!isAny.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${USERS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Parse query strings
    const { size, page, filter } = request.query;

    // Set default database limit and offset
    const limit = size ? size : 10;
    const offset = page ? page * limit : 0;

    // Filter query where
    const where = filter;

    // Find all user records
    const foundUsers = await usersService.findAll(offset, limit, where);

    // Check if we user records to return
    if (!foundUsers) {
      const error = new Error('CONTROLLER ERROR: No read all users records found.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Found users response
    const responseBody = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: 'SUCCESS: Retrieved all users records.',
      data: foundUsers,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

/**
 * Read one user for a given primary key id
 *
 * @memberof module:controllers/users
 * @param {Object} request HTTP request object
 * @param {Object} response HTTP response callback object
 * @param {Object} next Next route handler callback object
 * @returns Returns a response body
 * @throws Will throw an error if no request.params is passed in.
 * @throws Will throw an error if no request.params.id is passed in.
 */
const readOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const USERS = resources.USERS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check we have request params
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your read one user request did not contain any params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

    // Check we have a primary key id to find
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your read one user request did not contain a id.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Check if requestUser.id equals id being requested
    const isPermission = (requestUser.id === id)
      ? authorizations.can(requestUser.role).readOwn(USERS)
      : authorizations.can(requestUser.role).readAny(USERS);

    // Check if permission is grated, throw error if not granted
    if (!isPermission.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${USERS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Get user with primary key id
    let foundUser = await usersService.findOneByPk(id);

    // Check we have a user record to return
    if (!foundUser) {
      const error = new Error(`CONTROLLER ERROR: Unable to retrieve user ${id} record.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Return user data
    const responseBody = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Retrieved user ${id} record.`,
      data: foundUser,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { readAll, readOne };
export default { all: readAll, one: readOne };
