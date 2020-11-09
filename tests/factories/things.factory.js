import faker from 'faker';
import { Thing } from '../../src/database';

/**
 * Generate an object which container attributes needed
 * to successfully create an instance.
 * 
 * @param  {Object} properties - Properties to use for the user.
 * @return {Object} - An object to build the user from.
 */
const _data = async (properties = {}) => {

  const defaultProperties = {
    name: faker.commerce.productName() + faker.random.alphaNumeric(5),
    description: faker.commerce.productAdjective(),
    price: faker.commerce.price(1.00, 78.00,2,''),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return Object.assign({}, defaultProperties, properties);
};

/**
 * Generates an instance from the properties provided by data.
 * 
 * @param  {Object} properties - Properties to use for the user.
 * @return {Object} - A thing test instance
 */
const createThing = async (properties = {}) => {
  let thing = await Thing.create(await _data(properties));
  return thing
}

export default createThing;
  
