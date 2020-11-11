import { confirmEmailTokens as confirmEmailTokensService } from '../../services';

/**
 * Destroy confirm email token record with primary key id
 *
 * @memberof module:controllers/confirmEmailTokens
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object callback.
 * @param {Object} next - Next route callback handler.
 * @returns {Object} Returns a http response object
 * @throws - Will throw an error if no request.params are provided.
 * @throws - Will throw an error if no primary key id is provided in the request.params.
 * @throws - Will throw an error if no destroyedCount is created.
 */
const destroyOne = async (request, response, next) => {
  try {
    // Check we have request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your request to destroy a confirm email token did not contain any params.');
      error.statusCode = 400;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

    // Check we have an id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your request to destroy a confirm email token did not contain an id in the params.');
      error.statusCode = 400;
      throw error;
    }

    // Count rows destroyed
    const destroyedCount = await confirmEmailTokensService.destroyOneByPk(id);

    // Check we have row count to respond with
    if (!destroyedCount) {
      const error = new Error(`CONTROLLER ERROR: Unable to destroy confirm email token ${id} record.`);
      error.statusCode = 500;
      throw error;
    }

    // Destroy response
    const responseBody = response.status(200).json({
      status: 200,
      message: `SUCCESS: Destroyed confirm email token ${id} record.`,
      count: destroyedCount,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

/**
 * Will destroy confirm email tokens that are past now.
 *
 * @memberof module:controllers/confirmEmailTokens
 * @param {Object} request - HTTP request object.
 * @param {Object} response - HTTP response object callback.
 * @param {Object} next - Next route callback handler.
 * @returns Will return a http response body.
 * @throws Will throw an error if no destroyedCount created.
 */
const destroyExpired = async (request, response, next) => {
  try {
    const destroyedCount = await confirmEmailTokensService.destroyExpiredTokens();

    if (!destroyedCount) {
      const error = new Error('CONTROLLER ERROR: No expired confirm email token records destroyed.');
      error.statusCode = 500;
      throw error;
    }

    // Destroy response
    const responseBody = response.status(200).json({
      status: 200,
      message: `SUCCESS: Destroyed expired confirm email token records.`,
      count: destroyedCount,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { destroyOne, destroyExpired };
export default { one: destroyOne, expired: destroyExpired };
