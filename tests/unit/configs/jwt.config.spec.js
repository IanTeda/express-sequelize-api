import { expect } from 'chai';
import { jwt } from '../../../src/configs';

describe('Unit :: Configs :: JSON Web Token', () => {
  it('expect config.jwt to have set properties', (done) => {
    expect(jwt).to.have.property('secret');
    expect(jwt).to.have.property('session');
    done();
  });
});
