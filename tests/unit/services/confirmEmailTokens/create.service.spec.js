import { expect } from 'chai';
import moment from 'moment';
import { confirmEmailTokens as confirmEmailTokensService } from '../../../../src/services';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Confirm Email Token :: Create', () => {
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

  it('expect ConfirmEmailToken.createOne to return a created token', async () => {
    // Generate fake email address
    const UserId = userTestInstance.id;

    // Request token from service
    const createdToken = await confirmEmailTokensService.createOne(UserId);

    // 24 Hours from now
    const now = new Date();
    const expireDateTime = moment(now).add(24, 'hours');
    const plusTwentyFour = expireDateTime.toDate();

    // Expect returned token to equal DB token
    expect(createdToken).to.have.property('id').to.be.ok;
    expect(createdToken).to.have.property('UserId').to.be.equal(UserId);
    expect(createdToken).to.have.property('token');
    expect(createdToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 10);
  });

  it('expect ConfirmEmailToken.createOne to throw error if no UserId provide', (done) => {
    // Set email empty
    const UserId = '';

    // Try to update reset token with empty email
    confirmEmailTokensService
      .createOne(UserId)
      .catch((err) => {
        // Error expectations
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: No user id was provided to generate email confirmation token.`);
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });
});
