import { expect } from 'chai';
import {things as thingsSeed} from '../../../src/database/seeds/development';

describe('Unit :: Database :: Seeds :: Development :: Things', () => {
  it('expect user seed to be an array of things', () => {
    expect(thingsSeed).to.be.an('Array');
  });

  it('expect user seed to be an array of at least 15 things', () => {
    expect(thingsSeed).to.have.lengthOf.at.least(14);
  });

  it('expect user seed to be an array of at no more than 50 things', () => {
    expect(thingsSeed).to.have.lengthOf.below(51);
  });

});
