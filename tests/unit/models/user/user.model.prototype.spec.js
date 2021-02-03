import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig } from '../../../../src/configs';
import { User } from '../../../../src/database';
import { users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: User ;; Prototype', () => {
  // Test instance to reference in testing
  let userTestInstance;

  beforeEach('truncate all database and build seed database', async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    userTestInstance = await usersFactory();
  });

  describe('User Prototype Function checks:', () => {
    it('expect User.create to generate salt and hashed password', async () => {
      // Set expectations for test user instance slat and password
      expect(userTestInstance.salt()).to.not.be.empty;
      expect(userTestInstance.password()).not.equal('password123');
    });

    it('expect user.password change the generate new salt and hashed password', async () => {
      // Test instance primary key id
      const id = userTestInstance.id;

      // Old hashed password and hash salt from test instance
      const oldHashedPassword = userTestInstance.password();
      const oldHashSalt = userTestInstance.salt();

      // New password to update and save
      const newPlainPassword = faker.internet.password();

      // Find user to update password for
      const foundUser = await User.findByPk(id);

      // Update user password
      foundUser.password = newPlainPassword;

      // Save user instance now password is updated
      await foundUser.save();

      // Set updated found user
      expect(foundUser.password()).to.not.equal(oldHashedPassword);
      expect(foundUser.salt()).to.not.equal(oldHashSalt);
      expect(foundUser.password()).to.not.equal(newPlainPassword); // Password is hashed
    });

    it('expect user.authenticate(plainPassword) to return true on correct plain user password', async () => {
      // User id to check password for
      const id = userTestInstance.id;

      // Plain password to authenticate
      const correctPlainPassword = 'password123';

      // Find user with id to authenticate password against
      const foundUser = await User.findByPk(id);

      // Authenticate plain password
      const authenticated = await foundUser.authenticate(correctPlainPassword);

      // Set expectations for password authentication
      expect(authenticated).to.be.true;
    });

    it('expect user.authenticate(plainPassword) to return false on incorrect plain user password', async () => {
      // User id to check password for
      const id = userTestInstance.id;

      // Plain password to authenticate
      const incorrectPlainPassword = faker.internet.password();

      // Find user to authenticate plain password against
      const foundUser = await User.findByPk(id);

      // Authenticate plain password
      const authenticated = await foundUser.authenticate(incorrectPlainPassword);

      // Set expectations for password authentication
      expect(authenticated).to.be.false;
    });

    it('expect user.generateJWT() to return JSON web token with payload and expiration', async () => {
      // User primary key id to generate JWT for
      const id = userTestInstance.id;

      // Find user with id
      const foundUser = await User.findByPk(id);

      // Generate JWT
      const generatedJWT = foundUser.generateJWT();

      // Decode JWT for check
      const decodedJWT = jwt.decode(generatedJWT, jwtConfig.secret);

      // Fifteen minutes from now
      const now = new Date() / 1000;
      const fifteenMinuteSeconds = 15 * 60;
      const plusFifteenMinutes = Math.floor(now + fifteenMinuteSeconds); // Round down

      // Set expectations for decoded JWT
      expect(decodedJWT).to.have.property('id').to.equal(id);
      expect(decodedJWT).to.have.property('exp').to.be.equal(plusFifteenMinutes);
    });

    it('expect user.isActive to be true if user.status is active', async () => {
      // Create an active user instance
      const activeUser = await usersFactory({
        status: 'active',
      });

      // Get id of the active user
      const id = activeUser.id;

      // Found the active user
      const foundUser = await User.findByPk(id);

      // Check if the user is active
      const isActive = await foundUser.isActive();

      expect(isActive).to.be.true;
    });

    it('expect user.isActive to be false if user.status is inactive', async () => {
      // Create an active user instance
      const activeUser = await usersFactory({
        status: 'inactive',
      });

      // Get id of the active user
      const id = activeUser.id;

      // Found the active user
      const foundUser = await User.findByPk(id);

      // Check if the user is active
      const isActive = await foundUser.isActive();

      expect(isActive).to.be.false;
    });
  });
});
