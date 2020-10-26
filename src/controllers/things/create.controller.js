import { things as thingsService } from '../../controllers';

/**
 * CREATE THING
 * ------------
 * Create a thing record in the database.
 *
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response callback object
 * @param {Object} next - Next route handler callback object
 */
const createOne = async (request, response, next) => {
  try {
    // Check we have a request body to parse
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your create thing request did not contain a body.');
      error.statusCode = 501;
      throw error;
    }

    // Parse the request body
    const { name, description, price } = request.body;

    // Check we have variables to build Thing object
    if (!name || !description || !price) {
      const error = new Error('CONTROLLER ERROR: Your create thing request did not contain a name, description or price.');
      error.statusCode = 501;
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
      error.statusCode = 501;
      throw error;
    }

    // Created response object
    const responseObject = response.status(201).json({
      status: 201,
      message: `SUCCESS: Thing ${createdThing.id} created.`,
      data: createdThing,
    });

    return responseObject;
  } catch (error) {
    next(error);
  }
};
