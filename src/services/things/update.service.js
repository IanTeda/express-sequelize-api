/**
 * @module services/things.update
 */

import { findOneByPk } from '.';

/**
 * UPDATE THING WITH ID
 * --------------------
 * Update and return thing with id in database table
 *
 * @param {Int} id The primary key id to update
 * @param {Object} data The thing data to update
 */
const updateOneByPk = async (id, data) => {
  try {
    // Check we have a primary key id and data to update
    if (!id || !data) {
      let err = new Error('SERVICE ERROR: Insufficient parameters in Thing update request.');
      err.statusCode = 501;
      throw err;
    }

    // Find thing to be updated
    let foundThing = await findOneByPk(id);

    // Update thing information only if we have a value
    if (data.name) foundThing.name = data.name;
    if (data.description) foundThing.description = data.description;
    if (data.price) foundThing.price = data.price;

    // Save thing instance to the database
    await foundThing.save();

    // Return the saved instance
    return foundThing;
  } catch (error) {
    throw error;
  }
};

export { updateOneByPk };
export default { oneByPk: updateOneByPk };
