import { expect } from 'chai';
import faker from 'faker'
import { resetTokens as resetTokenSeed } from '../../../src/database/seeds/development'

const users = [
  {
    id: faker.random.number(100)
  }
]

describe('Unit :: Database :: Seeds :: Development :: Reset Tokens', () => {

  let resetTokensSeedData

  beforeEach(async () => {
    resetTokensSeedData = resetTokenSeed(users);
  });

  it('expect resetTokensSeedData[0].UserId: to equal users[0].id', () => {
    expect(resetTokensSeedData[0].UserId).to.be.equal(users[0].id);
  })

  it('expect user seed to be an array of things', () => {
    expect(resetTokensSeedData).to.be.an('Array');
  });

  it('expect user seed to be an array of at least 30 things', () => {
    expect(resetTokensSeedData).to.have.lengthOf.at.least(29);
  });

  it('expect user seed to be an array of at no more than 100 things', () => {
    expect(resetTokensSeedData).to.have.lengthOf.below(101);
  });

});
