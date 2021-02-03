import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import { User } from '../../../../src/database';
import { users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: User :: Sequelize', () => {
  // Test instance to reference in testing
  let userTestInstance;

  beforeEach('truncate all database and build seed database', async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    userTestInstance = await usersFactory();
  });

  describe('User Sequelize Function Checks:', () => {
    it('expect User.create to return a created user with correlating properties', async () => {
      // Fake user data
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        salt: 'randomHashSalt',
        lastLogin: new Date(),
        status: 'active',
        role: 'user',
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user
      const createdUser = await User.create(fakeUserData);

      // Set expectations
      expect(createdUser).to.have.property('id');
      expect(createdUser).to.have.property('firstName').to.be.equal(fakeUserData.firstName);
      expect(createdUser).to.have.property('lastName').to.be.equal(fakeUserData.lastName);
      expect(createdUser).to.have.property('email').to.be.equal(fakeUserData.email);
      expect(createdUser).to.have.property('lastLogin').to.be.closeToTime(fakeUserData.lastLogin, 3);
      expect(createdUser).to.have.property('status').to.be.equal(fakeUserData.status);
      expect(createdUser).to.have.property('role').to.be.equal(fakeUserData.role);
      expect(createdUser).to.have.property('isEmailConfirmed').to.be.equal(fakeUserData.isEmailConfirmed);
    });

    it('expect User.findAll to return an array of found users', async () => {
      // Quantity of users to bulk create
      const qty = faker.random.number(40);

      // Fake data array of 50 items
      const fakeUserData = [...Array(qty)].map((users) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        salt: 'randomHashSalt',
        lastLogin: new Date(),
        status: 'active',
        role: 'user',
        isEmailConfirmed: faker.random.boolean(),
      }));

      // Import bulk fake data into ResetTokens table
      await User.bulkCreate(fakeUserData);

      // Find all ResetTokens
      const foundUsers = await User.findAll();

      // Get the length of ResetToken array length
      const numberOfFoundUsers = foundUsers.length;

      // Set expectations
      expect(foundUsers).to.be.an('Array');
      expect(numberOfFoundUsers).to.be.equal(qty + 1);
    });

    it('expect User.findByPk to return a user based on a primary key id', async () => {
      // Primary key id of user to find
      const id = userTestInstance.id;

      // Find user by primary key
      const foundUser = await User.findByPk(id);

      // Set expectations for found user
      expect(foundUser).to.have.property('id').to.be.equal(userTestInstance.id);
      expect(foundUser).to.have.property('firstName').to.be.equal(userTestInstance.firstName);
      expect(foundUser).to.have.property('lastName').to.be.equal(userTestInstance.lastName);
      expect(foundUser).to.have.property('email').to.be.equal(userTestInstance.email);
      expect(foundUser).to.have.property('lastLogin').to.be.closeToTime(userTestInstance.lastLogin, 3);
      expect(foundUser).to.have.property('status').to.be.equal(userTestInstance.status);
      expect(foundUser).to.have.property('role').to.be.equal(userTestInstance.role);
      expect(foundUser).to.have.property('isEmailConfirmed').to.be.equal(userTestInstance.isEmailConfirmed);
    });

    it('expect User.findOne to return the found user based on email query', async () => {
      // Email of user to find
      const email = userTestInstance.email;

      // Find user
      const foundUser = await User.findOne({
        where: {
          email: email,
        },
      });

      // Expectations for found user
      expect(foundUser).to.have.property('id').to.be.equal(userTestInstance.id);
      expect(foundUser).to.have.property('firstName').to.be.equal(userTestInstance.firstName);
      expect(foundUser).to.have.property('lastName').to.be.equal(userTestInstance.lastName);
      expect(foundUser).to.have.property('lastLogin').to.be.closeToTime(userTestInstance.lastLogin, 3);
      expect(foundUser).to.have.property('status').to.be.equal(userTestInstance.status);
      expect(foundUser).to.have.property('role').to.be.equal(userTestInstance.role);
      expect(foundUser).to.have.property('isEmailConfirmed').to.be.equal(userTestInstance.isEmailConfirmed);
    });

    it('expect User.findOrCreate to return found user and isCreated false when user is found', async () => {
      // Id of user to find or create
      const id = userTestInstance.id;

      // Find or create user
      const [foundOrCreatedUser, isCreated] = await User.findOrCreate({
        where: {
          id: id,
        },
      });

      // Set expectations for found user
      expect(foundOrCreatedUser).to.have.property('id').to.be.equal(userTestInstance.id);
      expect(foundOrCreatedUser).to.have.property('firstName').to.be.equal(userTestInstance.firstName);
      expect(foundOrCreatedUser).to.have.property('lastName').to.be.equal(userTestInstance.lastName);
      expect(foundOrCreatedUser).to.have.property('email').to.be.equal(userTestInstance.email);
      expect(foundOrCreatedUser).to.have.property('lastLogin').to.be.closeToTime(userTestInstance.lastLogin, 3);
      expect(foundOrCreatedUser).to.have.property('status').to.be.equal(userTestInstance.status);
      expect(foundOrCreatedUser).to.have.property('role').to.be.equal(userTestInstance.role);
      expect(foundOrCreatedUser).to.have.property('isEmailConfirmed').to.be.equal(userTestInstance.isEmailConfirmed);
      expect(isCreated).to.equal(false);
    });

    it('expect User.findOrCreate to return created user and isCreated true when ID can not be found', async () => {
      // Id of user to find or create
      const id = 1;

      // Fake user data to create if id cannot be found
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        salt: 'randomHashSalt',
        lastLogin: new Date(),
        status: 'active',
        role: 'user',
        isEmailConfirmed: faker.random.boolean(),
      };

      // Find or create user
      const [foundOrCreatedUser, isCreated] = await User.findOrCreate({
        where: {
          id: id,
        },
        defaults: fakeUserData,
      });

      // Set expectations for found or created user
      expect(foundOrCreatedUser).to.have.property('id');
      expect(foundOrCreatedUser).to.have.property('firstName').to.be.equal(fakeUserData.firstName);
      expect(foundOrCreatedUser).to.have.property('lastName').to.be.equal(fakeUserData.lastName);
      expect(foundOrCreatedUser).to.have.property('email').to.be.equal(fakeUserData.email);
      expect(foundOrCreatedUser).to.have.property('lastLogin').to.be.closeToTime(fakeUserData.lastLogin, 3);
      expect(foundOrCreatedUser).to.have.property('status').to.be.equal(fakeUserData.status);
      expect(foundOrCreatedUser).to.have.property('role').to.be.equal(fakeUserData.role);
      expect(foundOrCreatedUser).to.have.property('isEmailConfirmed').to.be.equal(fakeUserData.isEmailConfirmed);
      expect(isCreated).to.equal(true);
    });

    it('expect User.findAndCountAll to return count of user and array of found users', async () => {
      // Quantity of users to bulk create
      const qty = faker.random.number(40);

      // Fake data array of 50 items
      const fakeUserData = [...Array(qty)].map((users) => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        salt: 'randomHashSalt',
        lastLogin: new Date(),
        status: 'active',
        role: 'user',
        isEmailConfirmed: faker.random.boolean(),
      }));

      // Import bulk fake data into User table
      await User.bulkCreate(fakeUserData);

      // Count found users and return found users
      const { count: countFoundUsers, rows: foundUsers } = await User.findAndCountAll();

      // Set expectations for found user count and found users
      expect(countFoundUsers).to.equal(qty + 1);
      expect(foundUsers).to.be.an('Array');
    });

    it('expect User.destroy to return number of users destroyed', async () => {
      // Id of user to destroy
      const id = userTestInstance.id;

      // Count destroyed users
      const countDestroyedUsers = await User.destroy({
        where: {
          id: id,
        },
      });

      // Set expectations for counted destroyed users
      expect(countDestroyedUsers).to.equal(1);
    });
  });
});
