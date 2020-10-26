import { expect } from 'chai';
import faker from 'faker';
import { users as usersService } from '../../../../src/services';
import { users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Units :: Services :: Users :: Update', () => {
  // User instance to reference in testing
  let testUserInstance;

  beforeEach(async () => {
    // Destroy User table
    await truncate();

    // Create and assign new user
    testUserInstance = await usersFactory();
  });

  it('expect updateByPk to return an updated user', async () => {
    const id = testUserInstance.id;

    const updateData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123',
      lastLogin: new Date(),
      status: 'active',
      isEmailConfirmed: faker.random.boolean(),
    };

    const updatedThing = await usersService.updateByPk(id, updateData);

    expect(updatedThing).to.have.property('id').to.equal(testUserInstance.id);
    expect(updatedThing).to.have.property('firstName').to.equal(updateData.firstName);
    expect(updatedThing).to.have.property('lastName').to.equal(updateData.lastName);
    expect(updatedThing).to.have.property('email').to.equal(updateData.email);
    expect(updatedThing).to.have.property('password').to.not.equal(updateData.password);
    expect(updatedThing).to.have.property('lastLogin').to.be.closeToTime(testUserInstance.lastLogin, 3);
    expect(updatedThing).to.have.property('status').to.equal(updateData.status);
  });

  it('expect updateByPk to throw an error if ID cannot be found', (done) => {
    const id = 1;

    const updateData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123',
      lastLogin: new Date(),
      status: 'active',
      isEmailConfirmed: faker.random.boolean(),
    };

    usersService
      .updateByPk(id, updateData)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: User ${id} was not found to update.`);
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });

  it('expect updateByPk to throw an error if only one update parameter is sent', (done) => {
    const id = testUserInstance.id;

    usersService
      .updateByPk(id)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal('SERVICE ERROR: Insufficient parameters in user update request.');
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });

  it('expect updateByEmail to return an updated user', async () => {
    const email = testUserInstance.email;

    const updateData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123',
      lastLogin: new Date(),
      status: 'active',
      isEmailConfirmed: faker.random.boolean(),
    };

    const updatedThing = await usersService.updateByEmail(email, updateData);

    expect(updatedThing).to.have.property('id').to.equal(testUserInstance.id);
    expect(updatedThing).to.have.property('firstName').to.equal(updateData.firstName);
    expect(updatedThing).to.have.property('lastName').to.equal(updateData.lastName);
    expect(updatedThing).to.have.property('email').to.equal(updateData.email);
    expect(updatedThing).to.have.property('password').to.not.equal(updateData.password);
    expect(updatedThing).to.have.property('lastLogin').to.be.closeToTime(testUserInstance.lastLogin, 3);
    expect(updatedThing).to.have.property('status').to.equal(updateData.status);
  });

  it('expect updateByPk to throw an error if ID cannot be found', (done) => {
    const email = faker.internet.email();

    const updateData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123',
      lastLogin: new Date(),
      status: 'active',
      isEmailConfirmed: faker.random.boolean(),
    };

    usersService
      .updateByEmail(email, updateData)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: User ${email} was not found to update.`);
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });

  it('expect updateByEmail to throw an error if only one update parameter is sent', (done) => {
    const email = testUserInstance.email;

    usersService
      .updateByEmail(email)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal('SERVICE ERROR: Insufficient parameters in user update request.');
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });
});
