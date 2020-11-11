import { things as thingsService } from '../../services'

/** 
 * Read all thing records in the database
 * 
 * @memberof module:controllers/things
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const readAll = async (request, response, next) => {
  try {
    // Check we have a request body to parse
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your read all thing request did not contain a request body.');
      error.statusCode = 400;
      throw error;
    }

    // Parse the query strings
    const limit = request.query.size ? request.query.size : 10;
    const offset = request.query.page ? request.query.page * limit : 0;
    const where = request.query.filter;

    // Find all things
    const foundAllThings = await thingsService.findAll(offset, limit, where);

    // Check we have thing records
    if (!foundAllThings) {
      const error = new Error('CONTROLLER ERROR: Could not read all things.');
      error.statusCode = 500;
      throw error;
    }

    // All things data response
    const responseObject = response.status(200).json({
      status: 200,
      message: 'SUCCESS: Retrieved all things records.',
      data: foundAllThings,
    });

    return responseObject;
  } catch (err) {
    next(err);
  }
};

/** 
 * Read one thing record with primary key id
 * 
 * @memberof module:controllers/things
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const readOne = async (request, response, next) => {
  try {
    // Check there are request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your read request did not contain any params.');
      error.statusCode = 400;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

    // Check we have an id to find
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your read request did not contain a thing id.');
      error.statusCode = 400;
      throw error;
    }

    // Find thing with primary key id
    const thingRecord = await thingsService.findOneByPk(id);

    // Check we have a thing record to respond with
    if (!thingRecord) {
      const error = new Error(`CONTROLLER ERROR: Unable to read thing ${id} record.`);
      error.statusCode = 500;
      throw error;
    }

    // Find thing response
    const responseObject = response.status(200).json({
      status: 200,
      message: `SUCCESS: Retrieved thing ${id} record.`,
      data: thingRecord,
    });

    return responseObject;
  } catch (err) {
    next(err);
  }
};

export { readAll, readOne }
export default { all: readAll, one: readOne }
