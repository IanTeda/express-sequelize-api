import { expect } from 'chai';
import { users as usersFactory, resetTokens as resetTokensFactory } from '../../../factories';
import { resetTokens as resetTokensService } from '../../../../src/services';
import truncate from '../../../truncate-database';
import moment from 'moment';

describe('Unit :: Services :: Reset Tokens :: Create', () => {
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

  it('expect createOne to return a reset token', async () => {
    // Generate fake email address
    const UserId = userTestInstance.id;

    // Request token from service
    const createdResetToken = await resetTokensService.createOne(UserId);

    // 24 Hours from now
    const now = new Date();
    const expireDateTime = moment(now).add(24, 'hours');
    const plusTwentyFour = expireDateTime.toDate();

    // Expect returned token to equal DB token
    expect(createdResetToken).to.have.property('id');
    expect(createdResetToken).to.have.property('UserId').to.be.equal(UserId);
    expect(createdResetToken).to.have.property('isUsed').to.be.false;
    expect(createdResetToken).to.have.property('token');
    expect(createdResetToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 10);
  });

  it('expect createOne to throw error if no UserId', (done) => {
    // Set email empty
    const UserId = '';

    // Try to update reset token with empty email
    resetTokensService
      .createOne(UserId)
      .catch((err) => {
        // Error expectations
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: No user id was provided to generate reset token.`);
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });
});
