import { expect } from 'chai';
import moment from 'moment';
import { ConfirmEmailToken } from '../../../../src/database';
import { confirmEmailTokens as confirmEmailTokensService } from '../../../../src/services';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Service :: Confirm Email Token :: Destroy', () => {
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

  it('expect confirmEmailTokensService.destroyExpiredTokens return count 1 of rows deleted and number of table rows to be 0', async () => {
    // Update record so token is expired
    const UserId = confirmEmailTokenInstance.UserId;
    const record = await ConfirmEmailToken.findOne({
      where: {
        UserId: UserId,
      },
    });

    // Less 24 hours from now
    const now = new Date();
    const lessTwentyFour = moment(now).subtract(24, 'hours').toDate();

    // Update record so token is expired
    record.expiration = lessTwentyFour;
    await record.save();

    // Destroy expired tokens
    const count = await confirmEmailTokensService.destroyExpiredTokens();

    // Count rows in the database
    const rows = await ConfirmEmailToken.count();

    expect(count).to.equal(1);
    expect(rows).to.equal(0);
  });

  it('expect confirmEmailTokensService.destroyByPk to return count 1 for single primary key', async () => {
    const id = confirmEmailTokenInstance.id;

    const count = await confirmEmailTokensService.destroyOneByPk(id);

    expect(count).to.equal(1);
  });

  it('expect confirmEmailTokensService.destroyByPk to throw error if now primary key id provided', (done) => {
    // Empty email
    let id = 1;

    confirmEmailTokensService
      .destroyOneByPk(id)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Confirm email token ${id} was not found to destroy.`);
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });
});
