import { expect } from 'chai';
import { resources, roles } from '../../../src/configs';
import authorizations from '../../../src/controllers/things/authorizations.config';

describe('Unit :: Authorisations :: Things', () => {
  describe('01. roles.USER Authorisations', () => {
    const USER = roles.USER;
    const THINGS = resources.THINGS;

    it('expect create any to be true', (done) => {
      const isCreateAny = authorizations.can(USER).createAny(THINGS);
      expect(isCreateAny.granted).to.be.true;
      done();
    });

    it('expect create own to be true', (done) => {
      const isCreateOwn = authorizations.can(USER).createOwn(THINGS);
      expect(isCreateOwn.granted).to.be.true;
      done();
    });

    it('expect read any to be true', (done) => {
      const isReadAny = authorizations.can(USER).readAny(THINGS);
      expect(isReadAny.granted).to.be.true;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(USER).readOwn(THINGS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be true', (done) => {
      const isUpdateAny = authorizations.can(USER).updateAny(THINGS);
      expect(isUpdateAny.granted).to.be.true;
      done();
    });

    it('expect update own to be true', (done) => {
      const isUpdateOwn = authorizations.can(USER).updateOwn(THINGS);
      expect(isUpdateOwn.granted).to.be.true;
      done();
    });

    it('expect delete any to be true', (done) => {
      const isDeleteAny = authorizations.can(USER).deleteAny(THINGS);
      expect(isDeleteAny.granted).to.be.true;
      done();
    });

    it('expect delete own to be true', (done) => {
      const isDeleteOwn = authorizations.can(USER).deleteOwn(THINGS);
      expect(isDeleteOwn.granted).to.be.true;
      done();
    });
  });

  describe('02. roles.ADMIN Authorisations', () => {
    const ADMIN = roles.ADMIN;
    const THINGS = resources.THINGS;

    it('expect create any to be true', (done) => {
      const isCreateAny = authorizations.can(ADMIN).createAny(THINGS);
      expect(isCreateAny.granted).to.be.true;
      done();
    });

    it('expect create own to be true', (done) => {
      const isCreateOwn = authorizations.can(ADMIN).createOwn(THINGS);
      expect(isCreateOwn.granted).to.be.true;
      done();
    });

    it('expect read any to be true', (done) => {
      const isReadAny = authorizations.can(ADMIN).readAny(THINGS);
      expect(isReadAny.granted).to.be.true;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(ADMIN).readOwn(THINGS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be true', (done) => {
      const isUpdateAny = authorizations.can(ADMIN).updateAny(THINGS);
      expect(isUpdateAny.granted).to.be.true;
      done();
    });

    it('expect update own to be true', (done) => {
      const isUpdateOwn = authorizations.can(ADMIN).updateOwn(THINGS);
      expect(isUpdateOwn.granted).to.be.true;
      done();
    });

    it('expect delete any to be true', (done) => {
      const isDeleteAny = authorizations.can(ADMIN).deleteAny(THINGS);
      expect(isDeleteAny.granted).to.be.true;
      done();
    });

    it('expect delete own to be true', (done) => {
      const isDeleteOwn = authorizations.can(ADMIN).deleteOwn(THINGS);
      expect(isDeleteOwn.granted).to.be.true;
      done();
    });
  });

  describe('03. roles.SUDO Authorisations', () => {
    const SUDO = roles.SUDO;
    const THINGS = resources.THINGS;

    it('expect create any to be true', (done) => {
      const isCreateAny = authorizations.can(SUDO).createAny(THINGS);
      expect(isCreateAny.granted).to.be.true;
      done();
    });

    it('expect create own to be true', (done) => {
      const isCreateOwn = authorizations.can(SUDO).createOwn(THINGS);
      expect(isCreateOwn.granted).to.be.true;
      done();
    });

    it('expect read any to be true', (done) => {
      const isReadAny = authorizations.can(SUDO).readAny(THINGS);
      expect(isReadAny.granted).to.be.true;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(SUDO).readOwn(THINGS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be true', (done) => {
      const isUpdateAny = authorizations.can(SUDO).updateAny(THINGS);
      expect(isUpdateAny.granted).to.be.true;
      done();
    });

    it('expect update own to be true', (done) => {
      const isUpdateOwn = authorizations.can(SUDO).updateOwn(THINGS);
      expect(isUpdateOwn.granted).to.be.true;
      done();
    });

    it('expect delete any to be true', (done) => {
      const isDeleteAny = authorizations.can(SUDO).deleteAny(THINGS);
      expect(isDeleteAny.granted).to.be.true;
      done();
    });

    it('expect delete own to be true', (done) => {
      const isDeleteOwn = authorizations.can(SUDO).deleteOwn(THINGS);
      expect(isDeleteOwn.granted).to.be.true;
      done();
    });
  });
});
