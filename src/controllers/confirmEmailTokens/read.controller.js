import { confirmEmailTokens as confirmEmailTokensService } from '../../services';

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
    // Parse query strings
    const { size, page, filter } = request.query;

    // TODO: provide an application setting for this
    // Set default database limit and offset
    const limit = size ? size : 10;
    const offset = page ? page * limit : 0;

    // Filter query where
    const where = filter;

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
    // Check there are request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your read a confirm email token request did not contain any params.');
      error.statusCode = 400;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

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
