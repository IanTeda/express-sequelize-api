import { expect } from 'chai';
import { emailer } from '../../../src/utils';

describe('Unit :: Util :: Emailer', () => {

  it('expect emailer to have property forgotEmail', () => {
    expect(emailer).to.have.property('forgotEmail')
  })

  it('expect emailer.forgotEmail to be a function', () => {
    expect(typeof emailer.forgotEmail).to.be.equal('function');
  })

});
