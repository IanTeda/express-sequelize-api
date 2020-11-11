import { expect } from 'chai';
import { nodemailer } from '../../../src/configs';

describe('Unit :: Configs :: Nodemailer', () => {
  it('expect config.nodemailer to have ethereal, iinet & smtp', () => {
    expect(nodemailer).to.have.property('ethereal');
    expect(nodemailer).to.have.property('iinet');
    expect(nodemailer).to.have.property('smtp');
  });

  it('expect config.nodemailer.ethereal to have mail settings', () => {
    expect(nodemailer.ethereal).to.have.property('host');
    expect(nodemailer.ethereal).to.have.property('port');
    expect(nodemailer.ethereal).to.have.property('secure');
    expect(nodemailer.ethereal).to.have.property('auth');
    expect(nodemailer.ethereal.auth).to.have.property('user');
    expect(nodemailer.ethereal.auth).to.have.property('pass');
  });

  it('expect config.nodemailer.iinet to have mail settings', () => {
    expect(nodemailer.iinet).to.have.property('host');
    expect(nodemailer.iinet).to.have.property('port');
    expect(nodemailer.iinet).to.have.property('secure');
    expect(nodemailer.iinet).to.have.property('auth');
    expect(nodemailer.iinet.auth).to.have.property('user');
    expect(nodemailer.iinet.auth).to.have.property('pass');
  });

  it('expect config.nodemailer.smtp to have mail settings', () => {
    expect(nodemailer.smtp).to.have.property('host');
    expect(nodemailer.smtp).to.have.property('port');
    expect(nodemailer.smtp).to.have.property('secure');
    expect(nodemailer.smtp).to.have.property('auth');
    expect(nodemailer.smtp.auth).to.have.property('user');
    expect(nodemailer.smtp.auth).to.have.property('pass');
  });
});
