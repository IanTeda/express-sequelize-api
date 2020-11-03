import { expect } from 'chai';
import faker, { date } from 'faker';
import { users as usersService } from '../../../../src/services';
import { users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Users :: Create', () => {
  // User instance to reference in testing
  let testUser;

  beforeEach(async () => {
    // Destroy User table
    await truncate();

    // Create and assign new user
    testUser = await usersFactory();
  });

  it('expect createOne to return a created user instance', async () => {
    const testData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123',
      status: 'active',
    };

    const createdUser = await usersService.createOne(testData);

    const now = new Date();

    expect(createdUser).to.have.property('id');
    expect(createdUser).to.have.property('firstName').to.equal(testData.firstName);
    expect(createdUser).to.have.property('lastName').to.equal(testData.lastName);
    expect(createdUser).to.have.property('email').to.equal(testData.email);
    expect(createdUser).to.have.property('password').to.not.equal(testData.password);
    expect(createdUser).to.have.property('lastLogin').to.be.closeToTime(now, 20);
    expect(createdUser).to.have.property('status').to.be.equal(testData.status);
  });

  it('expect createOne to default lastLogin to now for created user', async () => {
    const testData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123',
      status: 'active',
    };

    const now = new Date();

    const createdUser = await usersService.createOne(testData);

    expect(createdUser).to.have.property('id');
    expect(createdUser).to.have.property('firstName').to.equal(testData.firstName);
    expect(createdUser).to.have.property('lastName').to.equal(testData.lastName);
    expect(createdUser).to.have.property('email').to.equal(testData.email);
    expect(createdUser).to.have.property('password').to.not.equal(testData.password);
    expect(createdUser).to.have.property('lastLogin').to.be.closeToTime(now, 20);
    expect(createdUser).to.have.property('status').to.be.equal(testData.status);
  });

  it('expect createOne to default isEmailConfirmed to false for created user', async () => {
    const testData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123',
      status: 'active',
    };

    const createdUser = await usersService.createOne(testData);

    const now = new Date();

    expect(createdUser).to.have.property('id');
    expect(createdUser).to.have.property('firstName').to.equal(testData.firstName);
    expect(createdUser).to.have.property('lastName').to.equal(testData.lastName);
    expect(createdUser).to.have.property('email').to.equal(testData.email);
    expect(createdUser).to.have.property('password').to.not.equal(testData.password);
    expect(createdUser).to.have.property('lastLogin').to.be.closeToTime(now, 20);
    expect(createdUser).to.have.property('status').to.be.equal(testData.status);
    expect(createdUser).to.have.property('isEmailConfirmed').to.be.false;
  });

  it('expect create to throw an error if no data is sent', (done) => {
    usersService
      .createOne()
      .catch((err) => {
        expect(err).to.have.property('message').to.equal('SERVICE ERROR: User request contained no data.');
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });

  it('expect createOne to throw a database error if firstName null sent', (done) => {
    const testData = {
      firstName: null,
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      lastLogin: new Date(),
      password: 'password123',
      status: 'active',
      isEmailConfirmed: faker.random.boolean(),
    };

    usersService
      .createOne(testData)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal('notNull Violation: DATABASE ERROR: Users first name cannot be null.');
        //expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });

  it('expect createOne to throw a database error if firstName empty', (done) => {
    const testData = {
      firstName: '',
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      lastLogin: new Date(),
      password: 'password123',
      status: 'active',
      isEmailConfirmed: faker.random.boolean(),
    };

    usersService
      .createOne(testData)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal('Validation error: DATABASE ERROR: Users first name must between 1 and 24 characters.');
        //expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });
});
