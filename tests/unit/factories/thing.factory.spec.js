import { expect } from 'chai';
import { Thing } from '../../../src/database';
import { things as thingsFactory } from '../../factories';
import truncate from '../../truncate-database';

describe('Unit :: Test Factory :: Thing', () => {
  // Thing instance to reference in testing
  let thingTestInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing test instance
    thingTestInstance = await thingsFactory();
  });

  it('expect factory.thing to generates a thing with ID', async () => {
    expect(thingTestInstance.id).to.be.ok;
  });

  it('expect truncate of Thing table with each test', async () => {
    const thingCount = await Thing.count();
    expect(thingCount).to.be.equal(1);
  });
});
