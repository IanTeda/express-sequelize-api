/**
 * This file is part of Express Sequelize API
 * ------------------------------------------
 * @module server.service.users
 * @author [Ian Teda] <ian@teda.id.au>
 */

import { User } from '../../database';

/**
 * CREATE ONE USER
 * ----------------
 * Create one user in the database table
 * Return row object when successful
 *
 * @alias services.users.createOne
 * @param {Object} data User data to create with
 * @returns Created user instance
 */
const createOne = async (data) => {
  try {
    // Check we have user data to create with
    if (!data) {
      const error = new Error('SERVICE ERROR: User request contained no data.');
      error.statusCode = 501;
      throw error;
    }

    // Build user data to create with
    const newUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      lastLogin: data.lastLogin,
      status: data.status,
      isEmailConfirmed: data.isEmailConfirmed,
    };

    // Create new user
    const createdUser = await User.create(newUserData);

    // Check we have a create user instance to return
    if (!createdUser) {
      const error = new Error(`SERVICE ERROR: Unable to create user.`);
      error.statusCode = 501;
      throw error;
    }

    return createdUser;
  } catch (error) {
    throw error;
  }
};

export { createOne };
export default { one: createOne };
