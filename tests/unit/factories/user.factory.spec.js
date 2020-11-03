import { expect } from 'chai';
import { User } from '../../../src/database';
import { users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

describe('Unit :: Database :: Factory :: User', () => {
  // User instance to reference in testing
  let userTestInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new user test instance
    userTestInstance = await usersFactory();
  });

  it('expect factory.user generates a User with ID', async () => {
    expect(userTestInstance.id).to.be.ok;
  });

  it('expect truncate of User table with each test', async () => {
    const userCount = await User.count();
    expect(userCount).to.be.equal(1);
  });
});
