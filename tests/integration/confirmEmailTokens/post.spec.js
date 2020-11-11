import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Integration :: ConfirmEmailTokens :: POST', () => {
  // User and Test instance to reference in testing
  let userTestInstance;
  let confirmEmailTokenInstance;

  beforeEach('truncate DB tables and generate test instances', async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new user and reset token test instance
    userTestInstance = await usersFactory();
    confirmEmailTokenInstance = await confirmEmailTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  it('expect POST to create and return a reset token', (done) => {
    const formData = {
      email: userTestInstance.email,
    };

    chai
      .request(server)
      .post('/api/confirm-email-tokens')
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(formData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('UserId').to.equal(userTestInstance.id);
        expect(response.body.data).to.have.property('token');
        expect(response.body.data).to.have.property('expiration');
        done();
      });
  });

  it('expect POST to return error if UserId is empty', (done) => {
    let formData = {};

    chai
      .request(server)
      .post(`/api/confirm-email-tokens`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(formData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(400);
        expect(response.body).to.have.property('message').to.equals(`CONTROLLER ERROR: Your create email confirmation token request did not contain an email in the request body.`);
        done();
      });
  });

});
