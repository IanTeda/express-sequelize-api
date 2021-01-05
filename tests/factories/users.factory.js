import faker from 'faker';
import { User } from '../../src/database';

/**
 * Generate an object which container attributes needed
 * to successfully create an instance.
 *
 * @param  {Object} properties - Properties to use for the user.
 * @return {Object} - An object to build the user from.
 */
const _data = async (properties = {}) => {
  let defaultProperties = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password123',
    lastLogin: new Date(),
    status: 'active',
    role: 'sudo',
  };

  return Object.assign({}, defaultProperties, properties);
};

/**
 * Generates an instance from the properties provided if not the default properties.
 *
 * @param  {Object} properties Properties to use for the user.
 * @return {Object} - A user test instance
 */
const createUser = async (properties = {}) => {
  // Create user
  let user = await User.create(await _data(properties));

  // Add bearer token to user instance
  user.token = user.generateJWT();

  // Return created user with token
  return user;
};

export default createUser;
