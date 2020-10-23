import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig } from '../../../src/configs';
import { User } from '../../../src/database';
import { users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Model :: User', () => {
  // Thing instance to reference in testing
  let userTestInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    userTestInstance = await usersFactory();
  });

  describe('01. User Sequelize Function Checks:', () => {
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

  describe('02. User Validation Checks:', () => {
    it('expect User.create to throw error with message on null first name', (done) => {
      // Fake user data with null firstName
      const fakeUserData = {
        firstName: null,
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch thrown errors
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectations for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: Users first name cannot be null.');
        })
        .then(done, done);
    });

    it('expect User.create to throw error with message on empty first name', (done) => {
      // Fake user data with empty first name
      const fakeUserData = {
        firstName: '',
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch thrown error
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectations for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: Users first name must between 1 and 24 characters.');
        })
        .then(done, done);
    });

    it('expect User.create to throw error with message on long name >24 characters', (done) => {
      // Fake user data with first name 25 alpha numeric characters long
      const fakeUserData = {
        firstName: faker.random.alphaNumeric(25),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch thrown errors
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectations for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: Users first name must between 1 and 24 characters.');
        })
        .then(done, done);
    });

    it('expect User.create to throw an error with message on duplicate email', (done) => {
      // Fake user data with email the same as generated test instance
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: userTestInstance.email,
        password: faker.internet.password(),
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user with fake data and catch thrown error
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectations for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: User email is already taken.');
        })
        .then(done, done);
    });

    it('expect User.create to throw an error with message on badly formed email', (done) => {
      // Fake user data with badly formed email address
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'I am not an email address',
        password: faker.internet.password(),
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch thrown errors
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectations for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: User email format should be <foo@bar.com>.');
        })
        .then(done, done);
    });

    it('expect User.create to throw an error with message on null email', (done) => {
      // Fake user data with a null email address
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: null,
        password: faker.internet.password(),
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch thrown errors
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectations for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: User email cannot be null.');
        })
        .then(done, done);
    });

    it('expect User.create to throw an error and message on empty email', (done) => {
      // Fake user data with empty email address
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: '',
        password: faker.internet.password(),
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch thrown errors
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectations for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: User email cannot be empty.');
        })
        .then(done, done);
    });

    it('expect User.create to throw an error with message on null password', (done) => {
      // Fake user data with null password
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: null,
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch thrown errors
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectations for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: User password cannot be null.');
        })
        .then(done, done);
    });

    it('expect User.create to throw an error with message on empty password', (done) => {
      // Fake user data with empty password
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: '',
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch thrown error
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectations for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: User password cannot be empty.');
        })
        .then(done, done);
    });

    it('expect User.create to throw an error with message on short <5 password', (done) => {
      // Fake user data with password less then 5 characters
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(4),
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch thrown error
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectation for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: User password must between 5 and 72 characters.');
        })
        .then(done, done);
    });

    it('expect User.create to throw an error with message on long >72 password', (done) => {
      // Fake user data with password 73 characters long
      const fakeUserData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(73),
        status: 'active',
        role: 'user',
        lastLogin: new Date(),
        isEmailConfirmed: faker.random.boolean(),
      };

      // Create user and catch error
      User.create(fakeUserData)
        .catch((error) => {
          // Set expectation for thrown error
          expect(error).to.have.property('message').to.contain('DATABASE ERROR: User password must between 5 and 72 characters.');
        })
        .then(done, done);
    });
  });

  describe('03. User Default Value Checks:', () => {
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
      expect(createdUser).to.have.property('role').to.be.equal('user');
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

  describe('04. User Prototype Function checks:', () => {
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
  });
});
