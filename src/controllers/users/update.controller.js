import { users as usersService } from '../../services';

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
    // Check we have request params
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your update one user request did not contain any request params.');
      error.statusCode = 501;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

    // Check we have a user primary key id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your update one user request did not contain a id param.');
      error.statusCode = 501;
      throw error;
    }

    // Check we have a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your update user request did not contain a request body.');
      error.statusCode = 501;
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
    const updatedUser = await usersService.updateByPk(id, updateData);

    // Check we have an updated user record
    if (!updatedUser) {
      const error = new Error(`CONTROLLER ERROR: Unable to update user ${id} record.`);
      error.statusCode = 501;
      throw error;
    }

    // Return updated user data
    const responseBody = response.status(201).json({
      status: 201,
      message: `SUCCESS: Updated user with id=${id} record.`,
      data: updatedUser,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { updateOne };
export default { one: updateOne };
