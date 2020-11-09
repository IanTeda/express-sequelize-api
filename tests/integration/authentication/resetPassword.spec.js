import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import chaiHttp from 'chai-http';
import server from '../../../src/app';
import { users as usersFactory, resetTokens as resetTokensFactory } from '../../factories';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);
chai.use(chaiDateTime);

describe('Integration :: Authentication :: Reset Password', () => {
  // User and Test instance to reference in testing
  let userTestInstance;
  let resetTokenTestInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new user and reset token test instance
    userTestInstance = await usersFactory();
    resetTokenTestInstance = await resetTokensFactory({
      UserId: userTestInstance.id,
      isUsed: false
    });
  });

  it('expect "/api/reset-password" to reset password with correct email and token', (done) => {
    const email = userTestInstance.email;
    const newPassword = faker.internet.password();
    const resetToken = resetTokenTestInstance.token;

    // Set login form data
    const formData = {
      email: email,
      password1: newPassword,
      password2: newPassword,
    };

    chai
      .request(server)
      .post(`/api/reset-password?token=${resetToken}`)
      .type('form')
      .send(formData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equals(`RESET SUCCESS: Password reset for ${email}.`);

        const loginData = {
          email: email,
          password: newPassword,
        };

        chai
          .request(server)
          .post('/api/login')
          .type('form')
          .send(loginData)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').to.equals(`SUCCESS: JSON Web Token generated.`);
            expect(res.body).to.have.property('token');
            done();
          });
      });
  });

  it('expect "/api/reset-password" to return an error when no query sent', (done) => {
    const email = userTestInstance.email;
    const newPassword = faker.internet.password();
    const token = resetTokenTestInstance.token;

    // Set login form data
    const formData = {
      email: email,
      password1: newPassword,
      password2: newPassword,
    };

    chai
      .request(server)
      .post(`/api/reset-password`)
      .type('form')
      .send(formData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').to.equals(`RESET FAILURE: Email or token could not be authenticated.`);
        done();
      });
  });

  it('expect "/api/reset-password" to return an error when no params sent', (done) => {
    const email = userTestInstance.email;
    const password = faker.internet.password();
    const token = resetTokenTestInstance.token;

    chai
      .request(server)
      .post(`/api/reset-password?token=${token}`)
      .type('form')
      .send()
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').to.equals(`RESET FAILURE: Email or token could not be authenticated.`);
        done();
      });
  });

  it('expect "/api/reset-password" to return an error with bad email', (done) => {
    const email = faker.internet.email();
    const newPassword = faker.internet.password();
    const token = resetTokenTestInstance.token;

    // Set login form data
    const formData = {
      email: email,
      password1: newPassword,
      password2: newPassword,
    };

    chai
      .request(server)
      .post(`/api/reset-password?token=${token}`)
      .type('form')
      .send(formData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').to.equals(`RESET FAILURE: Email or token could not be authenticated.`);
        done();
      });
  });

  it('expect "/api/reset-password" to return an error with bad token', (done) => {
    const email = userTestInstance.email;
    const newPassword = faker.internet.password();
    const token = faker.random.alphaNumeric(64);

    // Set login form data
    const formData = {
      email: email,
      password1: newPassword,
      password2: newPassword,
    };

    chai
      .request(server)
      .post(`/api/reset-password?token=${token}`)
      .type('form')
      .send(formData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message').to.equals(`RESET FAILURE: Email or token could not be authenticated.`);
        done();
      });
  });
});
