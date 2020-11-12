import { expect } from 'chai';
import router from '../../src/router';

describe('Unit :: Configs :: Router', () => {

  it('expect router to be a function', () => {
    expect(typeof router).to.be.equal('function');
  })

});
