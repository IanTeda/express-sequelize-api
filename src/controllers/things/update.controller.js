import { resources, statusCodes } from '../../configs';
import { things as thingsService } from '../../services';
import authorizations from './authorizations.config';

/**
 * Update thing record with primary key id
 *
 * @memberof module:controllers/things
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const updateOne = async (request, response, next) => {
  try {
    // Resource being created. We use this to check authorization later.
    const THINGS = resources.THINGS;
    // User instance requesting controller
    const requestUser = request.user;

    // Check if email matches req.user.email and set permission
    const isAny = authorizations.can(requestUser.role).updateAny(THINGS);

    // Check if permission is grated
    if (!isAny.granted) {
      const error = new Error(`AUTHORIZATION ERROR: You are not authorized to ${request.method} resources on ${THINGS}.`);
      error.statusCode = statusCodes.UNAUTHORIZED;
      throw error;
    }

    // Check we have request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your update request did not contain any params.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request params
    const id = Number(request.params.id);

    // Check we have an id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your update thing request did not contain a thing id.');
      error.statusCode = 400;
      throw error;
    }

    // Check we have a request body to parse
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your update thing request did not contain body.');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }

    // Parse request body
    const { name, description, price } = request.body;

    // Thing update data
    const updateData = {
      name: name,
      description: description,
      price: price,
    };

    // Update thing record
    const updatedRecord = await thingsService.updateOneByPk(id, updateData);

    // Check we have a thing record to respond with
    if (!updatedRecord) {
      const error = new Error(`CONTROLLER ERROR: Unable to update thing ${id} record.`);
      error.statusCode = 500;
      throw error;
    }

    // Updated thing response
    const responseObject = response.status(statusCodes.CREATED).json({
      status: statusCodes.CREATED,
      message: `SUCCESS: Updated thing with id=${id} record.`,
      data: updatedRecord,
    });

    return responseObject;
  } catch (error) {
    next(error);
  }
};

export { updateOne };
export default { one: updateOne };
