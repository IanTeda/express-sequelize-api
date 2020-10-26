import { Thing } from '../../database';

/**
 * DELETE THING WITH ID
 * --------------------
 * Delete thing with primary key id in the database table
 *
 * @param {Int} id Primary key id of thing to destroy
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

export { destroyOneByPk };
export default { oneByPk: destroyOneByPk };
