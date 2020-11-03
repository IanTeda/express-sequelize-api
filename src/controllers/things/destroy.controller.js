import { things as thingsService } from '../../services';

/** 
 * Destroy thing record with primary key id
 * 
 * @memberof module:controllers/things
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const destroyOne = async (request, response, next) => {
  try {
    // Check we have request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your destroy thing request did not contain any params.');
      error.statusCode = 501;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

    // Check we have an id to update
    if (!id) {
      console.log(id);
      const error = new Error('CONTROLLER ERROR: Your destroy thing request did not contain a thing id.');
      error.statusCode = 501;
      throw error;
    }

    // Count rows destroyed
    const countRowsDestroyed = await thingsService.destroyOneByPk(id);

    // Check we have row count to respond with
    if (!countRowsDestroyed) {
      const error = new Error(`CONTROLLER ERROR: Unable to destroy thing ${id} record.`);
      error.statusCode = 501;
      throw error;
    }

    // Destroy response
    const responseObject = response.status(200).json({
      status: 200,
      message: `SUCCESS: Destroyed thing ${id} record.`,
      count: countRowsDestroyed,
    });

    return responseObject;
  } catch (error) {
    next(error);
  }
};

/** 
 * Destroy all things in the database
 * 
 * @memberof module:controllers/things
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object callback
 * @param {Object} next - Call the next route callback handler
 */
const destroyAll = async (request, response, next) => {
  try {
    // Count the rows destroyed
    const countRowsDestroyed = await thingsService.destroyAll();

    // Check we have a row count to respond with
    if (!countRowsDestroyed) {
      const error = new Error(`CONTROLLER ERROR: Unable to destroy things.`);
      error.statusCode = 501;
      throw error;
    }

    // Destroy all response
    const responseObject = response.status(200).json({
      status: 200,
      message: `SUCCESS: Destroyed thing ${countRowsDestroyed} records.`,
      count: countRowsDestroyed,
    });

    return responseObject;
  } catch (error) {
    next(error);
  }
};

export { destroyOne, destroyAll }
export default { one: destroyOne, all: destroyAll }
