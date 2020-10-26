/**
 * @module services/things
 */

import { Thing } from '../../database';

/** Create a thing in the database table *
 * @param {Object} data Thing object data to create
 */
const createOne = async (data) => {
  try {
    // Check we have thing data to create with
    if (!data) {
      const err = new Error('SERVICE ERROR: Thing request contained no data.');
      err.statusCode = 501;
      throw err;
    }

    // Build thing object
    const newThingData = {
      name: data.name,
      description: data.description,
      price: data.price,
    };

    // Create a new thing
    const createdThing = await Thing.create(newThingData);

    // Check we have a created thing instance to return
    if (!createdThing) {
      const error = new Error(`SERVICE ERROR: Unable to create thing.`);
      error.statusCode = 501;
      throw error;
    }

    return createdThing;
  } catch (error) {
    throw error;
  }
};

export { createOne }
export default { one: createOne}
