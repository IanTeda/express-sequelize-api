import { expect } from 'chai';
import { router } from '../../../src/configs';

describe('Unit :: Config :: Router', () => {

  it('expect router to be a function', () => {
    expect(typeof router).to.be.equal('function');
  })

});
