import { expect } from 'chai';
import { users as usersFactory, resetTokens as resetTokensFactory } from '../../../factories';
import { resetTokens as resetTokensService} from '../../../../src/services'
import { ResetToken } from '../../../../src/database';
import truncate from '../../../truncate-database';
import moment from 'moment'

describe('Unit :: Services :: Reset Tokens :: Destroy', () => {
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

  it('expect destroyExpiredTokens return count 1 of rows deleted and number of table rows to be 0', async () => {
    // Update record so token is expired
    const UserId = resetTokenTestInstance.UserId;
    const record = await ResetToken.findOne({
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
    const count = await resetTokensService.destroyExpiredTokens();

    // Count rows in the database
    const rows = await ResetToken.count();

    expect(count).to.equal(1);
    expect(rows).to.equal(0);
  });

  it('expect destroyByPk to return count 1 for single primary key', async () => {
    const id = resetTokenTestInstance.id;

    const count = await resetTokensService.destroyOneByPk(id);

    expect(count).to.equal(1);
  });

  it('expect destroyByPk to throw error if now primary key id provided', (done) => {
    // Empty email
    let id = 1;

    resetTokensService
      .destroyOneByPk(id)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Reset token ${id} was not found to destroy.`);
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });
});
