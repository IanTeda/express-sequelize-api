import faker from 'faker';
import { ResetToken } from '../../src/database';

/**
 * Generate an object which container attributes needed
 * to successfully create an instance.
 *
 * @param  {Object} properties - Properties to use for the ResetToken.
 * @return {Object} - An object to build the ResetToken from.
 */
const _fakeData = async (properties = {}) => {
  const defaultProperties = {
    isUsed: faker.random.boolean(),
  };

  return Object.assign({}, defaultProperties, properties);
};

/**
 * Generates an instance from the properties provided by data.
 *
 * @param  {Object} properties - Properties to use for the ResetToken.
 * @return {Object} - A ResetToken instance
 */
const createResetToken = async (properties = {}) => {
  const createdResetToken = await ResetToken.create(await _fakeData(properties));
  return createdResetToken;
};

export default createResetToken;
