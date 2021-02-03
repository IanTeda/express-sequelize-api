import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import { Thing } from '../../../../src/database';
import { things as thingsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Thing :: Validation', () => {
  // Test instance to reference in testing
  let thingTestInstance;

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    thingTestInstance = await thingsFactory();
  });

  describe('Thing Validation Checks:', () => {
    it('expect Thing.create to throw an error on thing.name not unique', (done) => {
      // Fake thing data
      const fakeThingData = {
        name: thingTestInstance.name,
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      Thing.create(fakeThingData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: Thing name is already taken.');
        })
        .then(done, done);
    });

    it('expect Thing.create to throw an error on empty thing.name', (done) => {
      // Fake thing data
      const fakeThingData = {
        name: '',
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      Thing.create(fakeThingData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: Thing name cannot be empty.');
        })
        .then(done, done);
    });

    it('expect Thing.create to throw an error on thing.name is null', (done) => {
      // Fake thing data
      const fakeThingData = {
        name: null,
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      Thing.create(fakeThingData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: Thing name cannot be null.');
        })
        .then(done, done);
    });

    it('expect Thing.create to throw an error on empty thing.price', (done) => {
      // Fake thing data
      const fakeThingData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: '',
      };

      Thing.create(fakeThingData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: Thing price cannot be empty.');
        })
        .then(done, done);
    });

    it('expect Thing.create to throw an error on thing.name is null', (done) => {
      // Fake thing data
      const fakeThingData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: null,
      };

      Thing.create(fakeThingData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: Thing price cannot be null.');
        })
        .then(done, done);
    });
  });

});
