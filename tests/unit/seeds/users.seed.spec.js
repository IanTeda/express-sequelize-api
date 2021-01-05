import { expect } from 'chai';
import { users as usersSeed } from '../../../src/database/seeds/development';

describe('Unit :: Database :: Seeds :: Development :: Users', () => {
  it('expect user seed to be an array of users', () => {
    expect(usersSeed).to.be.an('Array');
  });

  it('expect user seed to be an array of at least 31 users', () => {
    expect(usersSeed).to.have.lengthOf.at.least(31);
  });

  it('expect user seed to be an array of at no more than 101 users', () => {
    expect(usersSeed).to.have.lengthOf.below(103);
  });
});
