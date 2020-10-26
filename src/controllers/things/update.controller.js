import { things as thingsService } from '../../controllers';

/**
 * UPDATE ENTRY
 * =============
 * Update thing record with primary key id
 *
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const updateOne = async (request, response, next) => {
  try {
    // Check we have request params to parse
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your update request did not contain any params.');
      error.statusCode = 501;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

    // Check we have an id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your update thing request did not contain a thing id.');
      error.statusCode = 501;
      throw error;
    }

    // Check we have a request body to parse
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your update thing request did not contain body.');
      error.statusCode = 501;
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
      error.statusCode = 501;
      throw error;
    }

    // Updated thing response
    const responseObject = response.status(201).json({
      status: 201,
      message: `SUCCESS: Updated thing with id=${id} record.`,
      data: updatedRecord,
    });

    return responseObject;
  } catch (error) {
    next(error);
  }
};

/**
 * DESTROY ALL ENTRIES
 * ==================
 *
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object callback
 * @param {Object} next - Call the next route callback handler
 */
const destroyAll = async (req, res, next) => {
  try {
    return res.send('CONTROLLER NOT IMPLEMENTED: Destroy all #template');
  } catch (error) {
    next(error);
  }
};