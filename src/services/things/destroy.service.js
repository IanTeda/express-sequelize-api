import { Thing } from '../../database';

/** 
 * Destroy a thing with the primary key id in the database table
 * 
 * @memberof module:services/things
 * @param {Int} id Primary key id of thing to destroy
 * @return {Int} Number of things deleted
 * @throws Will throw an error if no id is passed in
 * @throws Will throw an error if a thing count is not created
 * @example
 * import { things as thingsService } from '/src/services'
 * const id = 1;
 * const count = await thingsService.destroyOneByPk(id)
 */
const destroyOneByPk = async (id) => {
  try {
    // Check we have a primary key id passed in
    if (!id) {
      const err = new Error('SERVICE ERROR: No id provided in Thing destroy request.');
      err.statusCode = 501;
      throw err;
    }

    // Return number of rows destroyed
    const destroyedThingsCount = await Thing.destroy({
      where: {
        id: id,
      },
    });

    // Check there is a destroyed thing count to return
    if (!destroyedThingsCount) {
      const error = new Error(`SERVICE ERROR: Thing ${id} was not found to destroy.`);
      error.statusCode = 501;
      throw error;
    }

    return destroyedThingsCount;
  } catch (error) {
    throw error;
  }
};

/** 
 * Destroy all things in the database
 * 
 * @memberof module:services/things
 * @return {Int} A count of the thing rows destroyed
 * @throws Will throw an error if no destroy count is created
 * @example
 * import { things as thingsService } from '/src/services'
 * const count = await thingsService.destroyAll()
 */
const destroyAll = async () => {
  try {
    // Count the number of things destroyed
    const destroyedThingsCount = await Thing.destroy({
      where: {},
      truncate: false,
    });

    // Check there is a destroyed thing count to return
    if (!destroyedThingsCount) {
      const error = new Error(`SERVICE ERROR: All things where not destroyed.`);
      error.statusCode = 501;
      throw error;
    }

    return destroyedThingsCount;
  } catch (error) {
    throw error;
  }
};

export { destroyOneByPk, destroyAll };
export default { oneByPk: destroyOneByPk, all: destroyAll };
