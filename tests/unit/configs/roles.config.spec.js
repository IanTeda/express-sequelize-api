import { expect } from 'chai';
import { roles } from '../../../src/configs';

describe('Unit :: Configs :: Roles', () => {
  it('expect roles[0] to be sudo role', () => {
    expect(roles.SUDO).to.be.equal('sudo');
    expect(roles.ADMIN).to.be.equal('admin');
    expect(roles.USER).to.be.equal('user');
    expect(roles.GUEST).to.be.equal('guest');
  });
});
