import faker from 'faker';
import { Authorization } from '../../src/database';
import { roles, resources, permissions } from '../../src/configs';

const _randomItem = (list) => {
  // Get a random number between 0 an 1 and multiple by the length of the array
  let percentage = Math.random();

  // Count the number of list values
  const count = Object.values(list).length;

  // Using floor to round downward the nearest integer
  let randomListNumber = Math.floor(percentage * count);

  // Random array value
  const randomListValue = Object.values(list)[randomListNumber];

  // Return random value
  return randomListValue;
} 

/**
 * Generate an object which container attributes needed
 * to successfully create an instance.
 *
 * @param  {Object} properties - Properties to use for the ResetToken.
 * @return {Object} - An object to build the ResetToken from.
 */
const _fakeData = async (properties = {}) => {
  const defaultProperties = {
    role: _randomItem(roles),
    userId: faker.random.number(100),
    resource: _randomItem(resources),
    resourceId: faker.random.number(100),
    permission: _randomItem(permissions),
  };

  return Object.assign({}, defaultProperties, properties);
};

/**
 * Generates an instance from the properties provided by data.
 *
 * @param  {Object} properties - Properties to use for the ResetToken.
 * @return {Object} - A ResetToken instance
 */
const createAuthorization = async (properties = {}) => {
  const authorization = await Authorization.create(await _fakeData(properties));
  return authorization;
};

export default createAuthorization;
