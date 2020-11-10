import { expect } from 'chai';
import faker from 'faker';
import { confirmEmailTokens as confirmEmailTokensService } from '../../../../src/services';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Service :: Confirm Email Token :: Find', () => {
  // User and Test instance to reference in testing
  let userTestInstance;
  let confirmEmailTokenInstance;

  beforeEach('truncate DB tables and generate test instances', async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new user and reset token test instance
    userTestInstance = await usersFactory();
    confirmEmailTokenInstance = await confirmEmailTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  it('expect findAll to return all email confirmation token rows', async () => {
    // Find all reset tokens
    const allTokens = await confirmEmailTokensService.findAll();

    // Set expectation that all reset tokens will be an array of reset tokens
    expect(allTokens).to.be.an('array');
  });

  it('expect findOneByPk to return token instance', async () => {
    // Primary key id to find
    const id = confirmEmailTokenInstance.id;

    // Find reset token instance for primary key id
    const foundToken = await confirmEmailTokensService.findOneByPk(id);

    // Set expectations for found reset token
    expect(foundToken).to.have.property('id').to.equal(confirmEmailTokenInstance.id);
    expect(foundToken).to.have.property('UserId').to.equal(confirmEmailTokenInstance.UserId);
    expect(foundToken).to.have.property('token').to.equal(confirmEmailTokenInstance.token);
    expect(foundToken).to.have.property('expiration').to.be.closeToTime(confirmEmailTokenInstance.expiration, 3);
  });

  it('expect findOneByPk to throw error if no id', (done) => {
    // Empty primary key id
    const id = '';

    // Try to find primary key id
    confirmEmailTokensService
      .findOneByPk(id)
      .catch((err) => {
        // Error expectations
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Primary key was not provided in the confirm email token find request.`);
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });

  it('expect findOneByPk to throw error if id not found', (done) => {
    // Primary key id of 1 is not likely to be found because of truncate/factory cycle
    const id = 1;

    // Try to find reset token with primary key id
    confirmEmailTokensService
      .findOneByPk(id)
      .catch((err) => {
        // Error expectations
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Confirm email token with id ${id} was not found.`);
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });

  it('expect findOneByToken to return token instance', async () => {
    const foundToken = await confirmEmailTokensService.findOneByToken(confirmEmailTokenInstance.token);

    expect(foundToken).to.have.property('id').to.equal(confirmEmailTokenInstance.id);
    expect(foundToken).to.have.property('UserId').to.equal(confirmEmailTokenInstance.UserId);
    expect(foundToken).to.have.property('token').to.equal(confirmEmailTokenInstance.token);
    expect(foundToken).to.have.property('expiration').to.be.closeToTime(confirmEmailTokenInstance.expiration, 3);
  });

  it('expect findOneByToken to throw error if no token', (done) => {
    const token = '';

    confirmEmailTokensService
      .findOneByToken(token)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: No token was provided in confirm email token find request.`);
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });

  it('expect findOneByToken to throw error if token not found', (done) => {
    const token = faker.random.alphaNumeric(32);

    confirmEmailTokensService
      .findOneByToken(token)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Confirm email token ${token} could not be found.`);
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });
});
