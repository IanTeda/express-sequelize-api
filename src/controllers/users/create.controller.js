import { users as usersService } from '../../services';

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
    // Check we hav a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your create one user request did not contain a request body.');
      error.statusCode = 501;
      throw error;
    }

    // Parse the request body for data
    const { firstName, lastName, email, password, status } = request.body;

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
      error.statusCode = 501;
      throw error;
    }

    // Created user response
    const responseBody = response.status(201).json({
      status: 201,
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
