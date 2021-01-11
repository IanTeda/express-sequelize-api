import { statusCodes } from '../../configs';
import { User } from '../../database';

/**
 * Delete user with primary key id in the database table and return number of rows deleted
 *
 * @memberof module:services/users
 * @param {Int} id Primary key id from database table to destroy
 * @returns {Int} Number of users deleted
 * @throws Will throw an error if no id is passed in
 * @throws Will throw an error if a destroyedUserCount is not created
 * @example
 * import { users as usersService } from '/src/services'
 * const id = 1;
 * const count = await usersService.destroyOneByPk(id)
 *
 */
const destroyByPk = async (id) => {
  try {
    // Check a primary key id has been passed in to destroy
    if (!id) {
      const error = new Error('SERVICE ERROR: No id provided in user destroy request');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Count the number of users destroyed
    let destroyedUserCount = await User.destroy({
      where: {
        id: id,
      },
    });

    // Check we have a destroyed user count to return
    if (!destroyedUserCount) {
      const error = new Error(`SERVICE ERROR: User ${id} was not found to destroy.`);
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    return destroyedUserCount;
  } catch (error) {
    throw error;
  }
};

export { destroyByPk };
export default { byPk: destroyByPk };
