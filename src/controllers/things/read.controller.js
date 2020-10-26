import { things as thingsService } from '../../controllers'


/**
 *  READ ALL ENTRIES
 *  =================
 *  Read all thing records in the database
 *
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const readAll = async (req, res, next) => {
  try {
    // Parse the query strings
    const limit = req.query.size ? req.query.size : 10;
    const offset = req.query.page ? req.query.page * limit : 0;
    const where = req.query.filter;

    // Find all things
    const allThingsRecords = await thingsService.findAll(offset, limit, where);

    // Check we have thing records
    if (!allThingsRecords) {
      const error = new Error('CONTROLLER ERROR: Could not read all things.');
      error.statusCode = 501;
      throw error;
    }

    // All things data response
    const responseObject = res.status(200).json({
      status: 200,
      message: 'SUCCESS: Retrieved all things records.',
      data: allThingsRecords,
    });

    return responseObject;
  } catch (err) {
    next(err);
  }
};

/**
 * READ ONE ENTRY
 * ==============
 * Read one thing record with primary key id
 *
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const readOne = async (request, response, next) => {
  try {
    // Check there are request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your read request did not contain any params.');
      error.statusCode = 501;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

    // Check we have an id to find
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your read request did not contain a thing id.');
      error.statusCode = 501;
      throw error;
    }

    // Find thing with primary key id
    const thingRecord = await thingsService.findOneByPk(id);

    // Check we have a thing record to respond with
    if (!thingRecord) {
      const error = new Error(`CONTROLLER ERROR: Unable to read thing ${id} record.`);
      error.statusCode = 501;
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
