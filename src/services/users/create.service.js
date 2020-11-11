import { User } from '../../database';

/**
 * Create one user in the database table
 *
 * @memberof module:services/users
 * @param {Object} userData User data object used to create.
 * @param {String} userData.firstName User first name.
 * @param {String} userData.lastName User last name.
 * @param {String} userData.email User email address.
 * @param {String} userData.password User plain text password that will be hashed on save.
 * @returns {Object} A created user instance.
 * @throws Will throw an error if there is no userData to create with.
 * @throws Will throw an error if a createdUser instance is not created
 * @example
 * import { users as usersService } from 'src/services';
 * const userDate = {
 *   firstName: 'Jane',
 *   lastName: 'Doe',
 *   email: 'jane.doe@hotmail.com',
 *   password: 'password123',
 * };
 * const createdUser = await usersService.createOne(userDate);
 */
const createOne = async (userData) => {
  try {
    // Check we have user data to create with
    if (!userData) {
      const error = new Error('SERVICE ERROR: User request contained no data.');
      error.statusCode = 500;
      throw error;
    }

    // Build user data to create with
    const newUserData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
    };

    // Create new user
    const createdUser = await User.create(newUserData);

    // Check we have a create user instance to return
    if (!createdUser) {
      const error = new Error(`SERVICE ERROR: Unable to create user.`);
      error.statusCode = 500;
      throw error;
    }

    return createdUser;
  } catch (error) {
    throw error;
  }
};

export { createOne };
export default { one: createOne };
