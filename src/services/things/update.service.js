import { findOneByPk } from '.';

/** 
 * Update and return thing with id in database table
 *
 * @memberof module:services/things
 * @param {Int} id The primary key id to update.
 * @param {Object} updatedThingData The thing data to update.
 * @param {String} [updatedThingData.name] Thing name.Date
 * @param {String} [updatedThingData.description] Thing description.
 * @param {Float} [updatedThingData.price] Thing price.
 * @return {Object} Updated thing instance.
 * @throws Will throw an error if no id and/or data passed in.
 * @example
 * import { resetTokens as resetTokensService } from 'src/services';
 * const id = 1;
 * const data = { isUsed: false };
 * const updatedResetToken = await resetTokensService.updateOneByPk(id, data)
 */
const updateOneByPk = async (id, updatedThingData) => {
  try {
    // Check we have a primary key id and data to update
    if (!id || !updatedThingData) {
      let err = new Error('SERVICE ERROR: Insufficient parameters in Thing update request.');
      err.statusCode = 500;
      throw err;
    }

    // Find thing to be updated
    let foundThing = await findOneByPk(id);

    // Update thing information only if we have a value
    if (updatedThingData.name) foundThing.name = updatedThingData.name;
    if (updatedThingData.description) foundThing.description = updatedThingData.description;
    if (updatedThingData.price) foundThing.price = updatedThingData.price;

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
