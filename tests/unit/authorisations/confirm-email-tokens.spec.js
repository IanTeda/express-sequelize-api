import { expect } from 'chai';
import { resources, roles } from '../../../src/configs';
import authorizations from '../../../src/controllers/confirmEmailTokens/authorizations.config';

describe('Unit :: Authorisations :: Confirm Email Tokens', () => {
  describe('01. roles.GUEST Authorisations', () => {
    const GUEST = roles.GUEST;
    const CONFIRM_EMAIL_TOKENS = resources.CONFIRM_EMAIL_TOKENS;

    it('expect create any to be false', (done) => {
      const isCreateAny = authorizations.can(GUEST).createAny(CONFIRM_EMAIL_TOKENS);
      expect(isCreateAny.granted).to.be.false;
      done();
    });

    it('expect create own to be false', (done) => {
      const isCreateOwn = authorizations.can(GUEST).createOwn(CONFIRM_EMAIL_TOKENS);
      expect(isCreateOwn.granted).to.be.false;
      done();
    });

    it('expect read any to be false', (done) => {
      const isReadAny = authorizations.can(GUEST).readAny(CONFIRM_EMAIL_TOKENS);
      expect(isReadAny.granted).to.be.false;
      done();
    });

    it('expect read own to be false', (done) => {
      const isReadOwn = authorizations.can(GUEST).readOwn(CONFIRM_EMAIL_TOKENS);
      expect(isReadOwn.granted).to.be.false;
      done();
    });

    it('expect update any to be false', (done) => {
      const isUpdateAny = authorizations.can(GUEST).updateAny(CONFIRM_EMAIL_TOKENS);
      expect(isUpdateAny.granted).to.be.false;
      done();
    });

    it('expect update own to be false', (done) => {
      const isUpdateOwn = authorizations.can(GUEST).updateOwn(CONFIRM_EMAIL_TOKENS);
      expect(isUpdateOwn.granted).to.be.false;
      done();
    });

    it('expect delete any to be false', (done) => {
      const isDeleteAny = authorizations.can(GUEST).deleteAny(CONFIRM_EMAIL_TOKENS);
      expect(isDeleteAny.granted).to.be.false;
      done();
    });

    it('expect delete own to be false', (done) => {
      const isDeleteOwn = authorizations.can(GUEST).deleteOwn(CONFIRM_EMAIL_TOKENS);
      expect(isDeleteOwn.granted).to.be.false;
      done();
    });
  });

  describe('02. roles.USER Authorisations', () => {
    const USER = roles.USER;
    const CONFIRM_EMAIL_TOKENS = resources.CONFIRM_EMAIL_TOKENS;

    it('expect create any to be false', (done) => {
      const isCreateAny = authorizations.can(USER).createAny(CONFIRM_EMAIL_TOKENS);
      expect(isCreateAny.granted).to.be.false;
      done();
    });

    it('expect create own to be false', (done) => {
      const isCreateOwn = authorizations.can(USER).createOwn(CONFIRM_EMAIL_TOKENS);
      expect(isCreateOwn.granted).to.be.false;
      done();
    });

    it('expect read any to be false', (done) => {
      const isReadAny = authorizations.can(USER).readAny(CONFIRM_EMAIL_TOKENS);
      expect(isReadAny.granted).to.be.false;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(USER).readOwn(CONFIRM_EMAIL_TOKENS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be false', (done) => {
      const isUpdateAny = authorizations.can(USER).updateAny(CONFIRM_EMAIL_TOKENS);
      expect(isUpdateAny.granted).to.be.false;
      done();
    });

    it('expect update own to be false', (done) => {
      const isUpdateOwn = authorizations.can(USER).updateOwn(CONFIRM_EMAIL_TOKENS);
      expect(isUpdateOwn.granted).to.be.false;
      done();
    });

    it('expect delete any to be false', (done) => {
      const isDeleteAny = authorizations.can(USER).deleteAny(CONFIRM_EMAIL_TOKENS);
      expect(isDeleteAny.granted).to.be.false;
      done();
    });

    it('expect delete own to be false', (done) => {
      const isDeleteOwn = authorizations.can(USER).deleteOwn(CONFIRM_EMAIL_TOKENS);
      expect(isDeleteOwn.granted).to.be.false;
      done();
    });
  });

  describe('03. roles.ADMIN Authorisations', () => {
    const ADMIN = roles.ADMIN;
    const CONFIRM_EMAIL_TOKENS = resources.CONFIRM_EMAIL_TOKENS;

    it('expect create any to be false', (done) => {
      const isCreateAny = authorizations.can(ADMIN).createAny(CONFIRM_EMAIL_TOKENS);
      expect(isCreateAny.granted).to.be.false;
      done();
    });

    it('expect create own to be false', (done) => {
      const isCreateOwn = authorizations.can(ADMIN).createOwn(CONFIRM_EMAIL_TOKENS);
      expect(isCreateOwn.granted).to.be.false;
      done();
    });

    it('expect read any to be true', (done) => {
      const isReadAny = authorizations.can(ADMIN).readAny(CONFIRM_EMAIL_TOKENS);
      expect(isReadAny.granted).to.be.true;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(ADMIN).readOwn(CONFIRM_EMAIL_TOKENS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be false', (done) => {
      const isUpdateAny = authorizations.can(ADMIN).updateAny(CONFIRM_EMAIL_TOKENS);
      expect(isUpdateAny.granted).to.be.false;
      done();
    });

    it('expect update own to be false', (done) => {
      const isUpdateOwn = authorizations.can(ADMIN).updateOwn(CONFIRM_EMAIL_TOKENS);
      expect(isUpdateOwn.granted).to.be.false;
      done();
    });

    it('expect delete any to be true', (done) => {
      const isDeleteAny = authorizations.can(ADMIN).deleteAny(CONFIRM_EMAIL_TOKENS);
      expect(isDeleteAny.granted).to.be.true;
      done();
    });

    it('expect delete own to be true', (done) => {
      const isDeleteOwn = authorizations.can(ADMIN).deleteOwn(CONFIRM_EMAIL_TOKENS);
      expect(isDeleteOwn.granted).to.be.true;
      done();
    });
  });

  describe('04. roles.SUDO Authorisations', () => {
    const SUDO = roles.SUDO;
    const CONFIRM_EMAIL_TOKENS = resources.CONFIRM_EMAIL_TOKENS;

    it('expect create any to be true', (done) => {
      const isCreateAny = authorizations.can(SUDO).createAny(CONFIRM_EMAIL_TOKENS);
      expect(isCreateAny.granted).to.be.true;
      done();
    });

    it('expect create own to be true', (done) => {
      const isCreateOwn = authorizations.can(SUDO).createOwn(CONFIRM_EMAIL_TOKENS);
      expect(isCreateOwn.granted).to.be.true;
      done();
    });

    it('expect read any to be true', (done) => {
      const isReadAny = authorizations.can(SUDO).readAny(CONFIRM_EMAIL_TOKENS);
      expect(isReadAny.granted).to.be.true;
      done();
    });

    it('expect read own to be true', (done) => {
      const isReadOwn = authorizations.can(SUDO).readOwn(CONFIRM_EMAIL_TOKENS);
      expect(isReadOwn.granted).to.be.true;
      done();
    });

    it('expect update any to be true', (done) => {
      const isUpdateAny = authorizations.can(SUDO).updateAny(CONFIRM_EMAIL_TOKENS);
      expect(isUpdateAny.granted).to.be.true;
      done();
    });

    it('expect update own to be true', (done) => {
      const isUpdateOwn = authorizations.can(SUDO).updateOwn(CONFIRM_EMAIL_TOKENS);
      expect(isUpdateOwn.granted).to.be.true;
      done();
    });

    it('expect delete any to be true', (done) => {
      const isDeleteAny = authorizations.can(SUDO).deleteAny(CONFIRM_EMAIL_TOKENS);
      expect(isDeleteAny.granted).to.be.true;
      done();
    });

    it('expect delete own to be true', (done) => {
      const isDeleteOwn = authorizations.can(SUDO).deleteOwn(CONFIRM_EMAIL_TOKENS);
      expect(isDeleteOwn.granted).to.be.true;
      done();
    });
  });
});
