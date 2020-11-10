import { expect } from 'chai';
import { users as usersFactory, resetTokens as resetTokensFactory } from '../../../factories';
import { resetTokens as resetTokensService} from '../../../../src/services'
import truncate from '../../../truncate-database';
import faker from 'faker'

describe('Unit :: Services :: Reset Tokens :: Find', () => {
  // User and Test instance to reference in testing
  let userTestInstance;
  let resetTokenTestInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new user and reset token test instance
    userTestInstance = await usersFactory();
    resetTokenTestInstance = await resetTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  it('expect findAll to return all reset token rows', async () => {
    // Find all reset tokens
    const allTokens = await resetTokensService.findAll();

    // Set expectation that all reset tokens will be an array of reset tokens
    expect(allTokens).to.be.an('array');
  });

  it('expect findOneByPk to return token instance', async () => {
    // Primary key id to find
    const id = resetTokenTestInstance.id;

    // Find reset token instance for primary key id
    const resetToken = await resetTokensService.findOneByPk(id);

    // Set expectations for found reset token
    expect(resetToken).to.have.property('id').to.equal(resetTokenTestInstance.id);
    expect(resetToken).to.have.property('UserId').to.equal(resetTokenTestInstance.UserId);
    expect(resetToken).to.have.property('token').to.equal(resetTokenTestInstance.token);
    expect(resetToken).to.have.property('expiration').to.be.closeToTime(resetTokenTestInstance.expiration, 3);
    expect(resetToken).to.have.property('isUsed').to.equal(resetTokenTestInstance.isUsed);
  });

  it('expect findOneByPk to throw error if no id', (done) => {
    // Empty primary key id
    const id = '';

    // Try to find primary key id
    resetTokensService
      .findOneByPk(id)
      .catch((err) => {
        // Error expectations
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: No id provided in reset token find request.`);
        expect(err).to.have.property('statusCode').to.equal(401);
      })
      .then(done, done);
  });

  it('expect findOneByPk to throw error if id not found', (done) => {
    // Primary key id of 1 is not likely to be found because of truncate/factory cycle
    const id = 1;

    // Try to find reset token with primary key id
    resetTokensService
      .findOneByPk(id)
      .catch((err) => {
        // Error expectations
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Reset token ${id} was not found.`);
        expect(err).to.have.property('statusCode').to.equal(401);
      })
      .then(done, done);
  });

  it('expect findOneByToken to return token instance', async () => {
    const resetToken = await resetTokensService.findOneByToken(resetTokenTestInstance.token);

    expect(resetToken).to.have.property('id').to.equal(resetTokenTestInstance.id);
    expect(resetToken).to.have.property('UserId').to.equal(resetTokenTestInstance.UserId);
    expect(resetToken).to.have.property('token').to.equal(resetTokenTestInstance.token);
    expect(resetToken).to.have.property('expiration').to.be.closeToTime(resetTokenTestInstance.expiration, 3);
    expect(resetToken).to.have.property('isUsed').to.equal(resetTokenTestInstance.isUsed);
  });

  it('expect findOneByToken to throw error if no token', (done) => {
    const token = '';

    resetTokensService
      .findOneByToken(token)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: No token value provided in reset token find request.`);
        expect(err).to.have.property('statusCode').to.equal(401);
      })
      .then(done, done);
  });

  it('expect findOneByToken to throw error if token not found', (done) => {
    const token = faker.random.alphaNumeric(32);

    resetTokensService
      .findOneByToken(token)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Reset token ${token} was not found.`);
        expect(err).to.have.property('statusCode').to.equal(401);
      })
      .then(done, done);
  });
});
