import { resources, statusCodes } from '../../configs';
import { users as usersService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Create a new user record in the database
 *
 * @memberof module:controllers/users
 * @param {Object} request HTTP request object
 * @param {Object} response HTTP response callback object
 * @param {Object} next Next route handler callback object
 * @returns Returns a http response
 * @throws Will throw an error if no request.body is passed in.
 * @throws Will throw an error if no createdUser is created.
 *
 */
const createOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const USERS = resources.USERS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check if req.user is allowed to create users
    const isAny = authorizations.can(requestUser.role).createAny(USERS);

    // Check if permission is grated
    if (!isAny.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${USERS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Check we hav a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your create one user request did not contain a request body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse the request body for data
    const { firstName, lastName, email, password, status } = request.body;

    if (!email || !password) {
      const error = new Error('CONTROLLER ERROR: Your create one user request did not contain enough parameters.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Construct new data
    const newUserData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      status: status,
    };

    // Create new user
    const createdUser = await usersService.createOne(newUserData);

    // Check we have a created user record to return
    if (!createdUser) {
      const error = new Error('CONTROLLER ERROR: Unable to create one new user.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Created user response
    const responseBody = response.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `SUCCESS: User ${createdUser.id} created.`,
      data: createdUser,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { createOne };
export default { one: createOne };
