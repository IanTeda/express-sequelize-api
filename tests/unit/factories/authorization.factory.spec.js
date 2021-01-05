import { expect } from 'chai';
import { Authorization } from '../../../src/database';
import { authorizations as authorizationsFactory } from '../../factories';
import truncate from '../../truncate-database';

describe('Unit :: Test Factories :: Authorization', () => {
  // Thing instance to reference in testing
  let authorizationTestInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing test instance
    authorizationTestInstance = await authorizationsFactory();
  });

  it('expect factory.authorizations to generates an Authorization with ID', async () => {
    expect(authorizationTestInstance.id).to.be.ok;
  });

  it('expect truncate of Authorization table with each test', async () => {
    const authorizationCount = await Authorization.count();
    expect(authorizationCount).to.be.equal(1);
  });
});
