import { expect } from 'chai';
import faker from 'faker';
import { users as usersService } from '../../../../src/services';
import { users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Users :: Find', () => {
  // User instance to reference in testing
  let testUser;

  beforeEach(async () => {
    // Destroy User table
    await truncate();

    // Create and assign new user
    testUser = await usersFactory();
  });

  it('expect readAll users to return array of user', async () => {
    const allUsers = await usersService.findAll();

    expect(allUsers).to.be.an('array');
  });

  it('expect findOneByPk user to return a user for the ID', async () => {
    const id = testUser.id;
    const user = await usersService.findOneByPk(id);

    expect(user).to.have.property('id').to.equal(testUser.id);
    expect(user).to.have.property('firstName').to.equal(testUser.firstName);
    expect(user).to.have.property('lastName').to.equal(testUser.lastName);
    expect(user).to.have.property('email').to.equal(testUser.email);
    expect(user).to.have.property('password').to.not.equal(testUser.password);
    expect(user).to.have.property('lastLogin').to.be.closeToTime(testUser.lastLogin, 3);
    expect(user).to.have.property('status').to.equal(testUser.status);
    expect(user).to.have.property('isEmailConfirmed').to.be.equal(testUser.isEmailConfirmed);
  });

  it('expect findOneByEmail to return a user for the ID', async () => {
    const email = testUser.email;
    const user = await usersService.findOneByEmail(email);

    expect(user).to.have.property('id').to.equal(testUser.id);
    expect(user).to.have.property('firstName').to.equal(testUser.firstName);
    expect(user).to.have.property('lastName').to.equal(testUser.lastName);
    expect(user).to.have.property('email').to.equal(testUser.email);
    expect(user).to.have.property('password').to.not.equal(testUser.password);
    expect(user).to.have.property('lastLogin').to.be.closeToTime(testUser.lastLogin, 3);
    expect(user).to.have.property('status').to.equal(testUser.status);
    expect(user).to.have.property('isEmailConfirmed').to.be.equal(testUser.isEmailConfirmed);
  });

  it('expect findOneByPk to throw an error when no ID provided', (done) => {
    usersService
      .findOneByPk()
      .catch((err) => {
        expect(err).to.have.property('message').to.equal('SERVICE ERROR: No id provided in user find request.');
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });

  it('expect findOneByPk to throw an error if ID cannot be found', (done) => {
    const id = 1;

    usersService
      .findOneByPk(id)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: User ${id} was not found.`);
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });

  it('expect findOneByEmail to throw an error when no email provided', (done) => {
    usersService
      .findOneByEmail()
      .catch((err) => {
        expect(err).to.have.property('message').to.equal('SERVICE ERROR: No email provided in user find request.');
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });

  it('expect findOneByEmail to throw an error if email cannot be found', (done) => {
    const email = faker.internet.email();

    usersService
      .findOneByEmail(email)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: User with ${email} was not found.`);
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });
});
