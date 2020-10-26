/**
 * This file is part of Express Sequelize API
 * ------------------------------------------
 * @module services/things
 * @author Ian Teda <ian@teda.id.au>
 */

import { Thing } from '../../database';

/**
 * CREATE THING
 * ------------
 * Create one thing in the database table
 * Return thing instance when successful
 *
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
