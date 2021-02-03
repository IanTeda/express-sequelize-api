import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import { User } from '../../../../src/database';
import { users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: User :: Default', () => {
  // Test instance to reference in testing
  let userTestInstance;

  beforeEach('truncate all database and build seed database', async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    userTestInstance = await usersFactory();
  });

  describe('User Default Value Checks:', () => {
    it('expect user.status to default to active with User.create', async () => {
      // Fake user data
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        salt: 'randomHashSalt',
        lastLogin: new Date(),
        role: 'user',
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user
      const createdUser = await User.create(fakeUserData);

      // Set expectations for created user
      expect(createdUser).to.have.property('id');
      expect(createdUser).to.have.property('firstName').to.be.equal(fakeUserData.firstName);
      expect(createdUser).to.have.property('lastName').to.be.equal(fakeUserData.lastName);
      expect(createdUser).to.have.property('email').to.be.equal(fakeUserData.email);
      expect(createdUser).to.have.property('lastLogin').to.be.closeToTime(fakeUserData.lastLogin, 3);
      expect(createdUser).to.have.property('status').to.be.equal('active');
      expect(createdUser).to.have.property('role').to.be.equal(fakeUserData.role);
      expect(createdUser).to.have.property('isEmailConfirmed').to.be.equal(fakeUserData.isEmailConfirmed);
    });

    it('expect user.role to default to user with User.create', async () => {
      // Fake user data
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'password123',
        salt: 'randomHashSalt',
        lastLogin: new Date(),
        status: 'active',
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user
      const createdUser = await User.create(fakeUserData);

      // Set created user expectations
      expect(createdUser).to.have.property('id');
      expect(createdUser).to.have.property('firstName').to.be.equal(fakeUserData.firstName);
      expect(createdUser).to.have.property('lastName').to.be.equal(fakeUserData.lastName);
      expect(createdUser).to.have.property('email').to.be.equal(fakeUserData.email);
      expect(createdUser).to.have.property('lastLogin').to.be.closeToTime(fakeUserData.lastLogin, 3);
      expect(createdUser).to.have.property('status').to.be.equal(fakeUserData.status);
      expect(createdUser).to.have.property('role').to.be.equal('guest');
      expect(createdUser).to.have.property('isEmailConfirmed').to.be.equal(fakeUserData.isEmailConfirmed);
    });

    it('expect user.isEmailConfirmed to default to false with User.create', async () => {
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
      };

      // Create user
      const createdUser = await User.create(fakeUserData);

      // Set expectations for created user
      expect(createdUser).to.have.property('id');
      expect(createdUser).to.have.property('firstName').to.be.equal(fakeUserData.firstName);
      expect(createdUser).to.have.property('lastName').to.be.equal(fakeUserData.lastName);
      expect(createdUser).to.have.property('email').to.be.equal(fakeUserData.email);
      expect(createdUser).to.have.property('lastLogin').to.be.closeToTime(fakeUserData.lastLogin, 3);
      expect(createdUser).to.have.property('status').to.be.equal('active');
      expect(createdUser).to.have.property('role').to.be.equal(fakeUserData.role);
      expect(createdUser).to.have.property('isEmailConfirmed').to.be.false;
    });
  });
});
