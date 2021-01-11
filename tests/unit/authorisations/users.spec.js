import { expect } from 'chai';
import { resources, roles } from '../../../src/configs';
import authorizations from '../../../src/controllers/users/authorizations.config';

describe('Unit :: Authorisations :: Users', () => {
  describe('01. roles.USER Authorisations', () => {
    const USER = roles.USER;
    const USERS = resources.USERS;

    it('expect create any to be false', (done) => {
      const isCreateAny = authorizations.can(USER).createAny(USERS);
      expect(isCreateAny.granted).to.be.false;
      done();
    });

    it('expect create own to be false', (done) => {
      const isCreateOwn = authorizations.can(USER).createOwn(USERS);
      expect(isCreateOwn.granted).to.be.false;
      done();
    });

    it('expect read any to be false', (done) => {
      const isReadAny = authorizations.can(USER).readAny(USERS);
      expect(isReadAny.granted).to.be.false;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(USER).readOwn(USERS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be false', (done) => {
      const isUpdateAny = authorizations.can(USER).updateAny(USERS);
      expect(isUpdateAny.granted).to.be.false;
      done();
    });

    it('expect update own to be true', (done) => {
      const isUpdateOwn = authorizations.can(USER).updateOwn(USERS);
      expect(isUpdateOwn.granted).to.be.true;
      done();
    });

    it('expect delete any to be false', (done) => {
      const isDeleteAny = authorizations.can(USER).deleteAny(USERS);
      expect(isDeleteAny.granted).to.be.false;
      done();
    });

    it('expect delete own to be false', (done) => {
      const isDeleteOwn = authorizations.can(USER).deleteOwn(USERS);
      expect(isDeleteOwn.granted).to.be.false;
      done();
    });
  });

  describe('02. roles.ADMIN Authorisations', () => {
    const ADMIN = roles.ADMIN;
    const USERS = resources.USERS;

    it('expect create any to be true', (done) => {
      const isCreateAny = authorizations.can(ADMIN).createAny(USERS);
      expect(isCreateAny.granted).to.be.true;
      done();
    });

    it('expect create own to be true', (done) => {
      const isCreateOwn = authorizations.can(ADMIN).createOwn(USERS);
      expect(isCreateOwn.granted).to.be.true;
      done();
    });

    it('expect read any to be true', (done) => {
      const isReadAny = authorizations.can(ADMIN).readAny(USERS);
      expect(isReadAny.granted).to.be.true;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(ADMIN).readOwn(USERS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be true', (done) => {
      const isUpdateAny = authorizations.can(ADMIN).updateAny(USERS);
      expect(isUpdateAny.granted).to.be.true;
      done();
    });

    it('expect update own to be true', (done) => {
      const isUpdateOwn = authorizations.can(ADMIN).updateOwn(USERS);
      expect(isUpdateOwn.granted).to.be.true;
      done();
    });

    it('expect delete any to be true', (done) => {
      const isDeleteAny = authorizations.can(ADMIN).deleteAny(USERS);
      expect(isDeleteAny.granted).to.be.true;
      done();
    });

    it('expect delete own to be true', (done) => {
      const isDeleteOwn = authorizations.can(ADMIN).deleteOwn(USERS);
      expect(isDeleteOwn.granted).to.be.true;
      done();
    });
  });

  describe('03. roles.SUDO Authorisations', () => {
    const SUDO = roles.SUDO;
    const USERS = resources.USERS;

    it('expect create any to be true', (done) => {
      const isCreateAny = authorizations.can(SUDO).createAny(USERS);
      expect(isCreateAny.granted).to.be.true;
      done();
    });

    it('expect create own to be true', (done) => {
      const isCreateOwn = authorizations.can(SUDO).createOwn(USERS);
      expect(isCreateOwn.granted).to.be.true;
      done();
    });

    it('expect read any to be true', (done) => {
      const isReadAny = authorizations.can(SUDO).readAny(USERS);
      expect(isReadAny.granted).to.be.true;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(SUDO).readOwn(USERS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be true', (done) => {
      const isUpdateAny = authorizations.can(SUDO).updateAny(USERS);
      expect(isUpdateAny.granted).to.be.true;
      done();
    });

    it('expect update own to be true', (done) => {
      const isUpdateOwn = authorizations.can(SUDO).updateOwn(USERS);
      expect(isUpdateOwn.granted).to.be.true;
      done();
    });

    it('expect delete any to be true', (done) => {
      const isDeleteAny = authorizations.can(SUDO).deleteAny(USERS);
      expect(isDeleteAny.granted).to.be.true;
      done();
    });

    it('expect delete own to be true', (done) => {
      const isDeleteOwn = authorizations.can(SUDO).deleteOwn(USERS);
      expect(isDeleteOwn.granted).to.be.true;
      done();
    });
  });
});
