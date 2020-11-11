import { expect } from 'chai';
import { ConfirmEmailToken, User } from '../../../src/database';
import { users as usersFactory, confirmEmailTokens as confirmEmailTokensFactory } from '../../factories';
import truncate from '../../truncate-database';

describe('Unit :: Test Factories :: Confirm Email Token', () => {
  // User and Test instance to reference in testing
  let userTestInstance;
  let confirmEmailTokenInstance;

  beforeEach('truncate DB tables and generate test instances',async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new user and reset token test instance
    userTestInstance = await usersFactory();
    confirmEmailTokenInstance = await confirmEmailTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  it('expect factory.confirmEmailTokens to generates a ConfirmEmailTokens with ID', async () => {
    expect(userTestInstance.id).to.be.ok;
    expect(confirmEmailTokenInstance.id).to.be.ok;
    expect(confirmEmailTokenInstance).to.have.property('UserId').to.be.equal(userTestInstance.id);
    expect(confirmEmailTokenInstance).to.have.property('token').to.be.a('string');
    expect(confirmEmailTokenInstance).to.have.property('expiration').to.be.a('date');
  });

  it('expect truncate of confirmEmailTokens table with each test', async () => {
    const confirmEmailTokenCount = await ConfirmEmailToken.count();
    const userCount = await User.count();
    expect(confirmEmailTokenCount).to.be.equal(1);
    expect(userCount).to.be.equal(1);
  });

});
