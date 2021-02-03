import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import { Thing } from '../../../../src/database';
import { things as thingsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Thing :: Functions', () => {
  // Test instance to reference in testing
  let thingTestInstance;

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    thingTestInstance = await thingsFactory();
  });

  describe('Thing Sequelize Function Checks:', () => {
    it('expect Thing.create to return a created thing with correlating properties', async () => {
      // Fake user data
      const fakeThingData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      // Create user
      const createdThing = await Thing.create(fakeThingData);

      // Set expectations
      expect(createdThing).to.have.property('id');
      expect(createdThing).to.have.property('name').to.be.equal(fakeThingData.name);
      expect(createdThing).to.have.property('description').to.be.equal(fakeThingData.description);
      expect(createdThing).to.have.property('price').to.be.equal(fakeThingData.price);
    });

    it('expect Thing.findAll to return an array of found things', async () => {
      // Quantity of users to bulk create
      const qty = faker.random.number(20);

      // Fake data array of 50 items
      const fakeThingData = [...Array(qty)].map(() => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      }));

      // Import bulk fake data into ResetTokens table
      await Thing.bulkCreate(fakeThingData);

      // Find all ResetTokens
      const foundThings = await Thing.findAll();

      // Get the length of ResetToken array length
      const numberOfFoundThings = foundThings.length;

      // Set expectations
      expect(foundThings).to.be.an('Array');
      expect(numberOfFoundThings).to.be.equal(qty + 1);
    });

    it('expect Thing.findByPk to return a thing based on a primary key id', async () => {
      // Primary key id of user to find
      const id = thingTestInstance.id;

      // Find user by primary key
      const foundThing = await Thing.findByPk(id);

      // Set expectations for found thing
      expect(foundThing).to.have.property('id').to.be.equal(thingTestInstance.id);
      expect(foundThing).to.have.property('name').to.be.equal(thingTestInstance.name);
      expect(foundThing).to.have.property('description').to.be.equal(thingTestInstance.description);
      expect(foundThing).to.have.property('price').to.be.equal(thingTestInstance.price);
    });

    it('expect Thing.findOne to return the found thing based on name query', async () => {
      // Name of thing to find
      const name = thingTestInstance.name;

      // Find thing
      const foundThing = await Thing.findOne({
        where: {
          name: name,
        },
      });

      // Expectations for found thing
      expect(foundThing).to.have.property('id').to.be.equal(thingTestInstance.id);
      expect(foundThing).to.have.property('name').to.be.equal(thingTestInstance.name);
      expect(foundThing).to.have.property('description').to.be.equal(thingTestInstance.description);
      expect(foundThing).to.have.property('price').to.be.equal(thingTestInstance.price);
    });

    it('expect Thing.findOrCreate to return the found thing based on name query', async () => {
      // Name of thing to find
      const id = thingTestInstance.id;

      const fakeThingData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      // Find or create thing
      const [foundOrCreatedThing, isCreated] = await Thing.findOrCreate({
        where: {
          id: id,
        },
        defaults: fakeThingData,
      });

      // Expectations for found thing
      expect(foundOrCreatedThing).to.have.property('id').to.be.equal(thingTestInstance.id);
      expect(foundOrCreatedThing).to.have.property('name').to.be.equal(thingTestInstance.name);
      expect(foundOrCreatedThing).to.have.property('description').to.be.equal(thingTestInstance.description);
      expect(foundOrCreatedThing).to.have.property('price').to.be.equal(thingTestInstance.price);
      expect(isCreated).to.equal(false);
    });

    it('expect Thing.findOrCreate to return created thing and isCreated true when ID can not be found', async () => {
      // Name of thing to find
      const id = 1;

      const fakeThingData = {
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      };

      // Find or create thing
      const [foundOrCreatedThing, isCreated] = await Thing.findOrCreate({
        where: {
          id: id,
        },
        defaults: fakeThingData,
      });

      // Expectations for found thing
      expect(foundOrCreatedThing).to.have.property('id');
      expect(foundOrCreatedThing).to.have.property('name').to.be.equal(fakeThingData.name);
      expect(foundOrCreatedThing).to.have.property('description').to.be.equal(fakeThingData.description);
      expect(foundOrCreatedThing).to.have.property('price').to.be.equal(fakeThingData.price);
      expect(isCreated).to.equal(true);
    });

    it('expect Thing.findAndCountAll to return count of things and array of found things', async () => {
      // Quantity of users to bulk create
      const qty = faker.random.number(20);

      // Fake data array of 50 items
      const fakeThingData = [...Array(qty)].map(() => ({
        name: faker.commerce.productName(),
        description: faker.commerce.productAdjective(),
        price: faker.commerce.price(1.0, 78.0, 2, ''),
      }));

      // Import bulk fake data into ResetTokens table
      await Thing.bulkCreate(fakeThingData);

      // Count found users and return found users
      const { count: countFoundThings, rows: foundThings } = await Thing.findAndCountAll();

      // Set expectations for found user count and found users
      expect(countFoundThings).to.equal(qty + 1);
      expect(foundThings).to.be.an('Array');
    });

    it('expect Thing.destroy to return number of things destroyed', async () => {
      // Id of user to destroy
      const id = thingTestInstance.id;

      // Count destroyed users
      const countDestroyedThings = await Thing.destroy({
        where: {
          id: id,
        },
      });

      // Set expectations for counted destroyed users
      expect(countDestroyedThings).to.equal(1);
    });
  });
});
