/**
 * This file is part of Express Sequelize API
 * ------------------------------------------
 * @module server.service.users
 * @author [Ian Teda] <ian@teda.id.au>
 */

import { User } from '../../database';

/**
 * DELETE USER WITH ID
 * -------------------
 * Delete user with primary key id in the database table and return number of rows deleted
 *
 * @param {Int} id Primary key id from database table to destroy
 * @returns Number of users deleted
 */
const destroyByPk = async (id) => {
  try {
    // Check a primary key id has been passed in to destroy
    if (!id) {
      const error = new Error('SERVICE ERROR: No id provided in user destroy request');
      error.statusCode = 501;
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
      error.statusCode = 501;
      throw error;
    }

    return destroyedUserCount;
  } catch (error) {
    throw error;
  }
};

export { destroyByPk };
export default { byPk: destroyByPk };
