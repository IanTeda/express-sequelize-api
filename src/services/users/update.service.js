/**
 * This file is part of Express Sequelize API
 * ------------------------------------------
 * @module server.service.users
 * @author [Ian Teda] <ian@teda.id.au>
 */

import { User } from '../../database';

/**
 * UPDATE USER WITH ID
 * --------------------
 * Update user with primary key id and return user data
 *
 * @param {Int} id Database primary key ids
 * @param {Object} data User data JSON object
 * @return {Object} Update user data JSON object
 */
const updateByPk = async (id, data) => {
  try {
    // Check a user id and data has been passed in
    if (!id || !data) {
      const error = new Error('SERVICE ERROR: Insufficient parameters in user update request.');
      error.statusCode = 501;
      throw error;
    }

    // Find user instance to be updated
    const foundUser = await User.findOne({
      where: {
        id: id,
      },
    });

    // Check we have a found user instance to update
    if (!foundUser) {
      const error = new Error(`SERVICE ERROR: User ${id} was not found to update.`);
      error.statusCode = 501;
      throw error;
    }

    // Update user information only if we have a new value
    if (data.firstName) foundUser.firstName = data.firstName;
    if (data.lastName) foundUser.lastName = data.lastName;
    if (data.email) foundUser.email = data.email;
    if (data.lastLogin) foundUser.lastLogin = data.lastLogin;
    if (data.password) foundUser.password = data.password;
    if (data.status) foundUser.status = data.status;
    if (data.isEmailConfirmed) foundUser.isEmailConfirmed = data.isEmailConfirmed;

    // Save update user instance to the database
    await foundUser.save();

    // Return the saved instance
    return foundUser;
  } catch (error) {
    throw error;
  }
};

/**
 * UPDATE USER BY EMAIL
 * --------------------
 * Update user with unique email and return user data
 *
 * @param {String} email Unique email of user to update
 * @param {Object} data User data to update
 * @return {Object} Update user data JSON object
 */
const updateByEmail = async (email, data) => {
  try {
    // Check an email and user data has been passed in
    if (!email || !data) {
      const error = new Error('SERVICE ERROR: Insufficient parameters in user update request.');
      error.statusCode = 501;
      throw error;
    }

    // Find user instance to be updated
    let foundUser = await User.findOne({
      where: {
        email: email,
      },
    });

    // Check we have a found user to update
    if (!foundUser) {
      const error = new Error(`SERVICE ERROR: User ${email} was not found to update.`);
      error.statusCode = 501;
      throw error;
    }

    // Update user information only if we have a value
    if (data.firstName) foundUser.firstName = data.firstName;
    if (data.lastName) foundUser.lastName = data.lastName;
    if (data.email) foundUser.email = data.email;
    if (data.lastLogin) foundUser.lastLogin = data.lastLogin;
    if (data.password) foundUser.password = data.password;
    if (data.status) foundUser.status = data.status;
    if (data.isEmailConfirmed) foundUser.isEmailConfirmed = data.isEmailConfirmed;

    // Save user instance to the database
    await foundUser.save();

    // Return the saved instance
    return foundUser;
  } catch (error) {
    throw error;
  }
};

export { updateByPk, updateByEmail };

export default { byPk: updateByPk, byEmail: updateByEmail };
