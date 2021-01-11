import { resources, statusCodes } from '../../configs';
import { things as thingsService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Create a thing record in the database.
 *
 * @memberof module:controllers/things
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const createOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const THINGS = resources.THINGS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check we have a request body to parse
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your create thing request did not contain a body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Check if email matches req.user.email and set permission
    const isAny = authorizations.can(requestUser.role).createAny(THINGS);

    // Check if permission is grated
    if (!isAny.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${THINGS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Parse the request body
    const { name, description, price } = request.body;

    // Check we have variables to build Thing object
    if (!name || !description || !price) {
      const error = new Error('CONTROLLER ERROR: Your create thing request did not contain a name, description or price.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Build Thing data object
    const newThingData = {
      name: name,
      description: description,
      price: price,
    };

    // Create a new thing
    const createdThing = await thingsService.createOne(newThingData);

    // Check we have a created thing instance
    if (!createdThing) {
      const error = new Error('CONTROLLER ERROR: Unable to create a thing.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Created response object
    const responseObject = response.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `SUCCESS: Thing ${createdThing.id} created.`,
      data: createdThing,
    });

    return responseObject;
  } catch (error) {
    next(error);
  }
};

export { createOne };
export default { one: createOne };
