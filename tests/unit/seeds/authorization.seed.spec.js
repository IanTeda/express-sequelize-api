import { expect } from 'chai';
import { authorizations as authorizationsSeedData } from '../../../src/database/seeds/development';

describe('Unit :: Database :: Seeds :: Development :: Authorization', () => {
  it('expect Authorization table seed to be an array of authorizations', () => {
    expect(authorizationsSeedData).to.be.an('Array');
  });
});
