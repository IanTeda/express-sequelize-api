import { resources, statusCodes } from '../../configs';
import { users as usersService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Update user
 *
 * @memberof module:controllers/users
 * @param {Object} request HTTP request object
 * @param {Object} response HTTP response callback object
 * @param {Object} next Next route handler callback object
 * @returns WIll return a http response object
 * @throws Will throw an error if no request.params is passed in.
 * @throws Will throw an error if no request.params.id is passed it.
 * @throws Will throw an error if no request.body is passed in.
 * @throws Will throw an error if no updatedUser is created.
 */
const updateOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const USERS = resources.USERS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check we have request params
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your update one user request did not contain any request params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

    // Check we have a user primary key id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your update one user request did not contain a id param.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Check if requestUser.id equals id being requested
    const isPermission =
      requestUser.id === id
        ? // If they equal set authorisation for read Own
          authorizations.can(requestUser.role).updateOwn(USERS)
        : // If they do not equal set authorisation for read any
          authorizations.can(requestUser.role).updateAny(USERS);

    // Check if permission is grated, throw error if not granted
    if (!isPermission.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${USERS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Check we have a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your update user request did not contain a request body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request body
    const { firstName, lastName, email, password, status, isEmailConfirmed } = request.body;

    // Update data
    const updateData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      status: status,
      isEmailConfirmed: isEmailConfirmed,
    };

    // Update user record
    const updatedUser = await usersService.updateOneByPk(id, updateData);

    // Check we have an updated user record
    if (!updatedUser) {
      const error = new Error(`CONTROLLER ERROR: Unable to update user ${id} record.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Return updated user data
    const responseBody = response.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `SUCCESS: Updated user with ${id} record.`,
      data: updatedUser,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { updateOne };
export default { one: updateOne };
