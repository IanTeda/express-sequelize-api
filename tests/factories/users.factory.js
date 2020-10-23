import faker from 'faker';
import { User } from '../../src/database';

/**
 * Generate an object which container attributes needed
 * to successfully create an instance.
 *
 * @param  {Object} props Properties to use for the user.
 * @return {Object}       An object to build the user from.
 */
const _data = async (props = {}) => {
  let defaultProps = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: 'password123',
    lastLogin: new Date(),
    status: 'active',
    role: 'admin'
  };

  return Object.assign({}, defaultProps, props);
};

/**
 * Generates an instance from the properties provided by data.
 *
 * @param  {Object} props Properties to use for the user.
 * @return {Object}       A user instance
 */
const createUser = async (props = {}) => {
  // Create user
  let user = await User.create(await _data(props));

  // Add bearer token to user instance
  user.token = user.generateJWT();

  // Return created user with token
  return user;
};

export default createUser;
