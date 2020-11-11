import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import chaiHttp from 'chai-http';
import server from '../../../src/app';
import { users as usersFactory, confirmEmailTokens as confirmEmailTokensFactory } from '../../factories';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);
chai.use(chaiDateTime);

describe('Integration :: Authentication :: Register User', () => {
  let newFirstName;
  let newLastName;
  let newEmail;
  let newPassword;
  let userTestInstance;
  let confirmEmailTokenInstance;

  beforeEach('truncate all database tables', async () => {
    // Destroy thing table
    await truncate();

    newFirstName = faker.name.firstName();
    newLastName = faker.name.lastName();
    newEmail = faker.internet.email();
    newPassword = faker.internet.password();

    userTestInstance = await usersFactory();
    confirmEmailTokenInstance = await confirmEmailTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  it('expect "api/register" to return a new user instance', (done) => {
    const formData = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password1: newPassword,
      password2: newPassword,
    };

    chai
      .request(server)
      .post('/api/register')
      .type('form')
      .send(formData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('message').to.equals(`REGISTER SUCCESS: User ${response.body.data.id} created.`);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id').to.be.ok;
        expect(response.body.data).to.have.property('firstName').to.equal(newFirstName);
        expect(response.body.data).to.have.property('lastName').to.equal(newLastName);
        expect(response.body.data).to.have.property('email').to.equal(newEmail);
        expect(response.body.data).to.have.property('status').to.equal('active');
        expect(response.body.data).to.have.property('isEmailConfirmed').to.be.false; // Default false on creating
        expect(response.body.data).to.not.have.property('password').to.be.ok;
        expect(response.body.data).to.not.have.property('salt').to.be.ok;
        done();
      });
  });

  it('expect "/api/register" to return an error message without params', (done) => {
    const formData = {};

    chai
    .request(server)
    .post('/api/register')
    .type('form')
    .send(formData)
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message').to.equals(`REGISTER ERROR: Request did not contain enough parameters.`);
      done();
    });
  })

  it('expect "/api/register" to return an error message when passwords do not match', (done) => {
    const formData = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      password1: faker.random.alphaNumeric(12),
      password2: faker.random.alphaNumeric(12),
    };

    chai
    .request(server)
    .post('/api/register')
    .type('form')
    .send(formData)
    .end((error, response) => {
      expect(error).to.be.null;
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message').to.equals(`REGISTER ERROR: Passwords does not match.`);
      done();
    });
  })
});
