import { expect } from 'chai';
import { resources, roles } from '../../../src/configs';
import authorizations from '../../../src/controllers/resetTokens/authorizations.config';

describe('Unit :: Authorisations :: Reset Tokens', () => {
  describe('01. roles.USER Authorisations', () => {
    const USER = roles.USER;
    const RESET_TOKENS = resources.RESET_TOKENS;

    it('expect create any to be false', (done) => {
      const isCreateAny = authorizations.can(USER).createAny(RESET_TOKENS);
      expect(isCreateAny.granted).to.be.false;
      done();
    });

    it('expect create own to be false', (done) => {
      const isCreateOwn = authorizations.can(USER).createOwn(RESET_TOKENS);
      expect(isCreateOwn.granted).to.be.false;
      done();
    });

    it('expect read any to be false', (done) => {
      const isReadAny = authorizations.can(USER).readAny(RESET_TOKENS);
      expect(isReadAny.granted).to.be.false;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(USER).readOwn(RESET_TOKENS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be false', (done) => {
      const isUpdateAny = authorizations.can(USER).updateAny(RESET_TOKENS);
      expect(isUpdateAny.granted).to.be.false;
      done();
    });

    it('expect update own to be false', (done) => {
      const isUpdateOwn = authorizations.can(USER).updateOwn(RESET_TOKENS);
      expect(isUpdateOwn.granted).to.be.false;
      done();
    });

    it('expect delete any to be false', (done) => {
      const isDeleteAny = authorizations.can(USER).deleteAny(RESET_TOKENS);
      expect(isDeleteAny.granted).to.be.false;
      done();
    });

    it('expect delete own to be false', (done) => {
      const isDeleteOwn = authorizations.can(USER).deleteOwn(RESET_TOKENS);
      expect(isDeleteOwn.granted).to.be.false;
      done();
    });
  });

  describe('02. roles.ADMIN Authorisations', () => {
    const ADMIN = roles.ADMIN;
    const RESET_TOKENS = resources.RESET_TOKENS;

    it('expect create any to be false', (done) => {
      const isCreateAny = authorizations.can(ADMIN).createAny(RESET_TOKENS);
      expect(isCreateAny.granted).to.be.false;
      done();
    });

    it('expect create own to be false', (done) => {
      const isCreateOwn = authorizations.can(ADMIN).createOwn(RESET_TOKENS);
      expect(isCreateOwn.granted).to.be.false;
      done();
    });

    it('expect read any to be true', (done) => {
      const isReadAny = authorizations.can(ADMIN).readAny(RESET_TOKENS);
      expect(isReadAny.granted).to.be.true;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(ADMIN).readOwn(RESET_TOKENS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be false', (done) => {
      const isUpdateAny = authorizations.can(ADMIN).updateAny(RESET_TOKENS);
      expect(isUpdateAny.granted).to.be.false;
      done();
    });

    it('expect update own to be false', (done) => {
      const isUpdateOwn = authorizations.can(ADMIN).updateOwn(RESET_TOKENS);
      expect(isUpdateOwn.granted).to.be.false;
      done();
    });

    it('expect delete any to be true', (done) => {
      const isDeleteAny = authorizations.can(ADMIN).deleteAny(RESET_TOKENS);
      expect(isDeleteAny.granted).to.be.true;
      done();
    });

    it('expect delete own to be true', (done) => {
      const isDeleteOwn = authorizations.can(ADMIN).deleteOwn(RESET_TOKENS);
      expect(isDeleteOwn.granted).to.be.true;
      done();
    });
  });

  describe('03. roles.SUDO Authorisations', () => {
    const SUDO = roles.SUDO;
    const RESET_TOKENS = resources.RESET_TOKENS;

    it('expect create any to be true', (done) => {
      const isCreateAny = authorizations.can(SUDO).createAny(RESET_TOKENS);
      expect(isCreateAny.granted).to.be.true;
      done();
    });

    it('expect create own to be true', (done) => {
      const isCreateOwn = authorizations.can(SUDO).createOwn(RESET_TOKENS);
      expect(isCreateOwn.granted).to.be.true;
      done();
    });

    it('expect read any to be true', (done) => {
      const isReadAny = authorizations.can(SUDO).readAny(RESET_TOKENS);
      expect(isReadAny.granted).to.be.true;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(SUDO).readOwn(RESET_TOKENS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be true', (done) => {
      const isUpdateAny = authorizations.can(SUDO).updateAny(RESET_TOKENS);
      expect(isUpdateAny.granted).to.be.true;
      done();
    });

    it('expect update own to be true', (done) => {
      const isUpdateOwn = authorizations.can(SUDO).updateOwn(RESET_TOKENS);
      expect(isUpdateOwn.granted).to.be.true;
      done();
    });

    it('expect delete any to be true', (done) => {
      const isDeleteAny = authorizations.can(SUDO).deleteAny(RESET_TOKENS);
      expect(isDeleteAny.granted).to.be.true;
      done();
    });

    it('expect delete own to be true', (done) => {
      const isDeleteOwn = authorizations.can(SUDO).deleteOwn(RESET_TOKENS);
      expect(isDeleteOwn.granted).to.be.true;
      done();
    });
  });
});
