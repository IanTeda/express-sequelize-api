import { expect } from 'chai';
import { ResetToken, User } from '../../../src/database';
import { users as usersFactory, resetTokens as resetTokensFactory } from '../../factories';
import truncate from '../../truncate-database';

describe('Unit :: Database :: Factory :: Reset Token', () => {
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

  it('expect factory.resetToken to generates a Reset Token with ID', async () => {
    expect(userTestInstance.id).to.be.ok;
    expect(resetTokenTestInstance.id).to.be.ok;
    expect(resetTokenTestInstance).to.have.property('UserId').to.be.equal(userTestInstance.id);
  });

  it('expect truncate of ResetToken table with each test', async () => {
    const resetTokenCount = await ResetToken.count();
    const userCount = await User.count();
    expect(resetTokenCount).to.be.equal(1);
    expect(userCount).to.be.equal(1);
  });
});
