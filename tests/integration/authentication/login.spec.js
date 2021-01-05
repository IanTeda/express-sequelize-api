import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import chaiHttp from 'chai-http';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import server from '../../../src/app';
import { users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);
chai.use(chaiDateTime);

describe('Integration :: Authentication :: Login', () => {
  let userTestInstance;
  let userTestInstance2;
  let testEmail = faker.internet.email();
  let testEmail2 = faker.internet.email();
  let testPassword = faker.internet.password();

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create and assign new thing
    userTestInstance = await usersFactory({
      email: testEmail,
      password: testPassword,
      isEmailConfirmed: true
    });

    userTestInstance2 = await usersFactory({
      email: testEmail2,
      password: testPassword,
      isEmailConfirmed: false
    })

  });

  it('expect "/api/login" to return a JSON Web Token', (done) => {
    // Set login form data
    const loginData = {
      email: testEmail,
      password: testPassword,
    };

    chai
      .request(server)
      .post('/api/login')
      .type('form')
      .send(loginData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: JSON Web Token generated.`);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('expect "/api/login" token to have userTestInstance.id', (done) => {
    // Set login form data
    const loginData = {
      email: testEmail,
      password: testPassword,
    };

    chai
      .request(server)
      .post('/api/login')
      .type('form')
      .send(loginData)
      .end((error, response) => {
        // Get token from response body
        const token = response.body.token;

        // Decode token with jsonwebtoken
        const decodedToken = jwt.decode(token, { complete: true });

        expect(decodedToken).to.have.property('payload');
        expect(decodedToken.payload).to.have.property('id').to.be.equal(userTestInstance.id); // TODO: Why do we get 3 sometimes instead of 2
        done();
      });
  });

  it('expect "/api/login" token to have userTestInstance.exp', (done) => {
    // Set login form data
    const formData = {
      email: testEmail,
      password: testPassword,
    };

    chai
      .request(server)
      .post('/api/login')
      .type('form')
      .send(formData)
      .end((error, response) => {
        // Get token from response body
        const token = response.body.token;

        // Decode token with jsonwebtoken
        const decodedToken = jwt.decode(token, { complete: true });

        expect(decodedToken).to.have.property('payload');
        expect(decodedToken.payload).to.have.property('exp');
        done();
      });
  });
});
