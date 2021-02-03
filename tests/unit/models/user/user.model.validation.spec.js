import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import { User } from '../../../../src/database';
import { users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: User :: Validation', () => {
  // Test instance to reference in testing
  let userTestInstance;

  beforeEach('truncate all database and build seed database', async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    userTestInstance = await usersFactory();
  });
  describe('User Validation Checks:', () => {
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
});
