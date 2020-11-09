import { ConfirmEmailToken } from '../../src/database';

/**
 * Generate an object which container attributes needed
 * to successfully create an instance.
 *
 * @param  {Object} properties - Properties to use for the ConfirmEmailToken.
 * @return {Object} - An object to build the ConfirmEmailToken from.
 */
const _fakeData = async (properties = {}) => {
  const defaultProperties = {};

  return Object.assign({}, defaultProperties, properties);
};

/**
 * Generates an instance from the properties provided by data.
 *
 * @param  {Object} properties - Properties to use for the ConfirmEmailToken passed in when called in test.
 * @return {Object} - A ResetToken instance
 */
const createConfirmEmailToken = async (properties = {}) => {
  let createdConfirmEmailToken = await ConfirmEmailToken.create(await _fakeData(properties));
  return createdConfirmEmailToken;
};

export default createConfirmEmailToken;
