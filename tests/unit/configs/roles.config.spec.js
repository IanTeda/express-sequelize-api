import { expect } from 'chai';
import { roles } from '../../../src/configs';

describe('Unit :: Configs :: Roles', () => {
  it('expect roles[0] to be sudo role', () => {
    expect(roles[0]).to.be.equal('sudo');
    expect(roles[1]).to.be.equal('admin');
    expect(roles[2]).to.be.equal('user');
    expect(roles[3]).to.be.equal('guest');
  });
});
