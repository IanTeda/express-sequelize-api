import { resetTokens as resetTokensService } from '../../services';

/**
 * Read all reset token records.
 *
 * @memberof module:controllers/resetTokens
 * @param {Object} request HTTP request object.
 * @param {Object} response HTTP response object callback.
 * @param {Object} next Call the next route handler.
 * @returns Returns a http response body.
 * @throws Will throw an error if no foundResetTokens is created.
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
    const foundResetTokens = await resetTokensService.findAll(offset, limit, where);

    // Check if we user records to return
    if (!foundResetTokens) {
      const error = new Error('CONTROLLER ERROR: No reset token records found.');
      error.statusCode = 501;
      throw error;
    }

    // Found users response
    const responseBody = response.status(200).json({
      status: 200,
      message: 'SUCCESS: Retrieved all reset token records.',
      data: foundResetTokens,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

/**
 * Read all reset token records
 *
 * @memberof module:controllers/resetTokens
 * @param {Object} request HTTP request object
 * @param {Object} response HTTP response object callback
 * @param {Object} next Call the next route handler
 * @returns Returns a http response body.
 * @throws Will throw an error if no request.params are present.
 * @throws Will throw an error if no request.params.id is present.
 * @throws Will throw an error if foundResetToken is not created.
 */
const readOne = async (request, response, next) => {
  try {
    // Check there are request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your read one reset token request did not contain any params.');
      error.statusCode = 501;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

    // Check we have an id to find
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your read one reset token request did not contain an id.');
      error.statusCode = 501;
      throw error;
    }

    // Find thing with primary key id
    const foundResetToken = await resetTokensService.findOneByPk(id);

    // Check we have a thing record to respond with
    if (!foundResetToken) {
      const error = new Error(`CONTROLLER ERROR: Unable to read reset token ${id} record.`);
      error.statusCode = 501;
      throw error;
    }

    // Find thing response
    const responseBody = response.status(200).json({
      status: 200,
      message: `SUCCESS: Retrieved reset token ${id} record.`,
      data: foundResetToken,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { readAll, readOne };
export default { all: readAll, one: readOne };
