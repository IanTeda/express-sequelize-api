import { expect } from 'chai';
import { passport } from '../../../src/configs';

describe('Unit :: Configs :: Passport', () => {
  it('expect config.passport to have jwt & local strategy', (done) => {
    expect(passport).to.have.property('local');
    expect(passport).to.have.property('jwt');
    done();
  });

  it('expect config.passport.local to have property name', (done) => {
    expect(passport.local).to.have.property('name').to.be.equal('local');
    done();
  });

  it('expect config.passport.local to have private verify function', (done) => {
    expect(typeof passport.local._verify).to.be.equal('function');
    done();
  });

  it('expect config.passport.jwt to have property name', (done) => {
    expect(passport.jwt).to.have.property('name').to.be.equal('jwt');
    done();
  });

  it('expect config.passport.jwt to have private verify function', (done) => {
    expect(typeof passport.jwt._verify).to.be.equal('function');
    done();
  });
});
