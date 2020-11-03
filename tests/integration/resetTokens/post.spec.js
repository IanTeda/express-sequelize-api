import { resetTokens as resetTokensFactory, users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Integration :: ResetTokens :: POST', () => {
  // Thing instance to reference in testing
  let resetTokenTestInstance;
  let userTestInstance;

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create and assign new thing
    userTestInstance = await usersFactory();
    resetTokenTestInstance = await resetTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  it('expect POST to create and return a reset token', (done) => {
    const resetTokenData = {
      email: userTestInstance.email,
    };

    chai
      .request(server)
      .post('/api/reset-tokens')
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(resetTokenData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('message');
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('UserId').to.equal(userTestInstance.id);
        expect(response.body.data).to.have.property('token');
        expect(response.body.data).to.have.property('expiration');
        expect(response.body.data).to.have.property('isUsed').to.be.false;
        done();
      });
  });

  it('expect POST to return error if UserId is empty', (done) => {
    let thingData = {};

    chai
      .request(server)
      .post(`/api/reset-tokens`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(thingData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(501);
        expect(response.body).to.have.property('message').to.equals(`CONTROLLER ERROR: Your create reset-token request did not contain an email in the request body.`);
        done();
      });
  });
});
