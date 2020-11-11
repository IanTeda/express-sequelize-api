import { users as usersService } from '../../services';

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
      error.statusCode = 500;
      throw error;
    }

    // Found users response
    const responseBody = response.status(200).json({
      status: 200,
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
    // Check we have request params
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your read one user request did not contain any params.');
      error.statusCode = 400;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

    // Check we have a primary key id to find
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your read one user request did not contain a id.');
      error.statusCode = 400;
      throw error;
    }

    // Get user with primary key id
    let foundUser = await usersService.findOneByPk(id);

    // Check we have a user record to return
    if (!foundUser) {
      const error = new Error(`CONTROLLER ERROR: Unable to retrieve user ${id} record.`);
      error.statusCode = 500;
      throw error;
    }

    // Return user data
    const responseBody = response.status(200).json({
      status: 200,
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
