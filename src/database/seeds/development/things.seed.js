'use strict';
import faker from 'faker';

const dice = faker.random.number({
  'min': 15,
  'max': 50
})

const things = [...Array(dice)].map((thing) => (
  {
    name: faker.commerce.productName(),
    description: faker.commerce.productAdjective(),
    price: faker.commerce.price(1.00,99.99,2),
  }
));

export default things
