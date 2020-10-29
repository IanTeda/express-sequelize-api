import { Thing } from '../../database';

/** 
 * Create a thing in the database
 * 
 * @memberof module:services/things
 * @param {Object} thingData Thing object data to create
 * @param {String} thingData.name Thing name
 * @param {String} thingData.description Thing description
 * @param {Float} thingData.price Thing price
 * @returns {Object} A created thing instance
 * @throws Will throw an error if there is no thingData to create with
 * @throws Will throw an error if a create thing instance is not created
 * @example
 * import { things as thingsService } from 'src/services';
 * const thingData = {
 *   name: 'A new thing name',
 *   description: 'A description of the new thing is awesome',
 *   price: 99.99,
 * };
 * const createdThing = await thingsService.createOne(thingData);
 */
const createOne = async (thingData) => {
  try {
    // Check we have thing data to create with
    if (!thingData) {
      const err = new Error('SERVICE ERROR: Thing request contained no data.');
      err.statusCode = 501;
      throw err;
    }

    // Build thing object
    const newThingData = {
      name: thingData.name,
      description: thingData.description,
      price: thingData.price,
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
