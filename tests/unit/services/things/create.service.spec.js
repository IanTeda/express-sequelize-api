import { expect } from 'chai';
import faker from 'faker';
import { things as thingsService } from '../../../../src/services';
import { things as thingsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Things :: Create', () => {
  // Thing instance to reference in testing
  let testThing;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testThing = await thingsFactory();
  });

  it('expect createOne to return a thing', async () => {
    const thingData = {
      name: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      price: faker.commerce.price(1.0, 78.0, 2, ''),
    };

    const createdThing = await thingsService.createOne(thingData);

    expect(createdThing).to.have.property('id');
    expect(createdThing).to.have.property('name').to.equal(thingData.name);
    expect(createdThing).to.have.property('description').to.equal(thingData.description);
    expect(createdThing).to.have.property('price').to.equal(thingData.price);
  });

  it('expect createOne to throw an error if duplicate name is being created', (done) => {
    const thingData = {
      name: testThing.name,
      description: faker.commerce.productAdjective(),
      price: faker.commerce.price(1.0, 78.0, 2, ''),
    };

    // Database validation errors do not add statusCode
    thingsService
      .createOne(thingData)
      .catch((err) => {
        expect(err.message).to.equal('DATABASE ERROR: Thing name is already taken.');
      })
      .then(done, done);
  });

  it('expect createOne to throw an error if no data is sent', (done) => {
    thingsService
      .createOne()
      .catch((err) => {
        expect(err.message).to.equal('SERVICE ERROR: Thing request contained no data.');
        expect(err.statusCode).to.equal(400);
      })
      .then(done, done);
  });

  it('expect createOne to throw an error if data is null', (done) => {
    const thingData = null;

    // Database validation errors do not add statusCode
    thingsService
      .createOne(thingData)
      .catch((err) => {
        expect(err.message).to.equal('SERVICE ERROR: Thing request contained no data.');
      })
      .then(done, done);
  });
});
