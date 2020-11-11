import { User } from '../../database';

/**
 * Update user with primary key id and return user data
 *
 * @memberof module:services/users
 * @param {Int} id Database primary key ids
 * @param {Object} userUpdateData User data JSON object
 * @param {String} [userUpdateData.firstName] User first name.
 * @param {String} [userUpdateData.lastName] User last name.
 * @param {String} [userUpdateData.email] User email address.
 * @param {Date} [userUpdateData.lastLogin] The last time the user logged in.
 * @param {String} [userUpdateData.password] User plain password that will be hashed on save.
 * @param {String} [userUpdateData.status] User account status.
 * @param {Boolean} [userUpdateData.isEmailConfirmed] Has the user email been confirmed
 * @return {Object} Update user data JSON object
 * @throws Will throw an error if no id or userUpdateData passed in.
 * @example
 * import { users as usersService } from 'src/services';
 * const id = 1;
 * const userUpdateData = {
 *   firstName: 'Jonathan',
 *   lastName: 'Doer',
 *   email: 'Jonathan.Doer@hotmail.com',
 *   password: 'newPassword123',
 * };
 * const updatedResetToken = await usersService.updateOneByPk(id, data)
 */
const updateOneByPk = async (id, userUpdateData) => {
  try {
    // Check a user id and data has been passed in
    if (!id || !userUpdateData) {
      const error = new Error('SERVICE ERROR: Insufficient parameters in user update request.');
      error.statusCode = 500;
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
      error.statusCode = 500;
      throw error;
    }

    // Update user information only if we have a new value
    if (userUpdateData.firstName) foundUser.firstName = userUpdateData.firstName;
    if (userUpdateData.lastName) foundUser.lastName = userUpdateData.lastName;
    if (userUpdateData.email) foundUser.email = userUpdateData.email;
    if (userUpdateData.lastLogin) foundUser.lastLogin = userUpdateData.lastLogin;
    if (userUpdateData.password) foundUser.password = userUpdateData.password;
    if (userUpdateData.status) foundUser.status = userUpdateData.status;
    if (userUpdateData.isEmailConfirmed) foundUser.isEmailConfirmed = userUpdateData.isEmailConfirmed;

    // Save update user instance to the database
    await foundUser.save();

    // Return the saved instance
    return foundUser;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user with unique email and return user data
 *
 * @memberof module:services/users
 * @param {String} email Unique email of user to update.
 * @param {Object} userUpdateData User data to update.
 * @param {String} [userUpdateData.firstName] User first name.
 * @param {String} [userUpdateData.lastName] User last name.
 * @param {String} [userUpdateData.email] User email.
 * @param {Date} [userUpdateData.lastLogin] Last time the user logged in.
 * @param {String} [userUpdateData.password] Plain text password that will be hashed on save.
 * @param {String} [userUpdateData.status] User status.
 * @param {Boolean} [userUpdateData.isEmailConfirmed] Has the user email been confirmed.
 * @return {Object} Update user data JSON object
 * @throws Will throw an error if no email or userUpdateData passed in.
 * @example
 * import { users as usersService } from 'src/services';
 * const id = 1;
 * const userUpdateData = {
 *   firstName: 'Jonathan',
 *   lastName: 'Doer',
 *   email: 'Jonathan.Doer@hotmail.com',
 *   password: 'newPassword123',
 * };
 * const updatedResetToken = await usersService.updateOneByEmail(id, data)
 */
const updateOneByEmail = async (email, userUpdateData) => {
  try {
    // Check an email and user data has been passed in
    if (!email || !userUpdateData) {
      const error = new Error('SERVICE ERROR: Insufficient parameters in user update request.');
      error.statusCode = 500;
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
      error.statusCode = 500;
      throw error;
    }

    // Update user information only if we have a value
    if (userUpdateData.firstName) foundUser.firstName = userUpdateData.firstName;
    if (userUpdateData.lastName) foundUser.lastName = userUpdateData.lastName;
    if (userUpdateData.email) foundUser.email = userUpdateData.email;
    if (userUpdateData.lastLogin) foundUser.lastLogin = userUpdateData.lastLogin;
    if (userUpdateData.password) foundUser.password = userUpdateData.password;
    if (userUpdateData.status) foundUser.status = userUpdateData.status;
    if (userUpdateData.isEmailConfirmed) foundUser.isEmailConfirmed = userUpdateData.isEmailConfirmed;

    // Save user instance to the database
    await foundUser.save();

    // Return the saved instance
    return foundUser;
  } catch (error) {
    throw error;
  }
};

export { updateOneByPk, updateOneByEmail };

export default { oneByPk: updateOneByPk, oneByEmail: updateOneByEmail };
