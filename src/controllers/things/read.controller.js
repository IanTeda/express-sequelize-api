import { resources, statusCodes } from '../../configs';
import { things as thingsService } from '../../services';
import authorizations from './authorizations.config';

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
    // Resource being created. We use this to check authorization later.
    const THINGS = resources.THINGS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check if email matches req.user.email and set permission
    const isAny = authorizations.can(requestUser.role).readAny(THINGS);

    // Check if permission is grated
    if (!isAny.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${THINGS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Check we have a request body to parse
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your read all thing request did not contain a request body.');
      error.statusCode = statusCodes.BAD_REQUEST;
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
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // All things data response
    const responseObject = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
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
    // Resource being created. We use this to check authorization later.
    const THINGS = resources.THINGS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check if email matches req.user.email and set permission
    const isAny = authorizations.can(requestUser.role).readAny(THINGS);

    // Check if permission is grated
    if (!isAny.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${THINGS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Check there are request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your read request did not contain any params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

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
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Find thing response
    const responseObject = response.status(statusCodes.OK).json({
      status: statusCodes.OK,
      message: `SUCCESS: Retrieved thing ${id} record.`,
      data: thingRecord,
    });

    return responseObject;
  } catch (err) {
    next(err);
  }
};

export { readAll, readOne };
export default { all: readAll, one: readOne };
