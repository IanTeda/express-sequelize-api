import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Unit :: Integration :: Confirm Email Token :: DELETE', () => {
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

  
  it('expect DELETE :id to delete reset token with primary key ID', (done) => {

    const id = confirmEmailTokenInstance.id

    chai
      .request(server)
      .delete(`/api/confirm-email-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message').to.equals(`SUCCESS: Destroyed confirm email token ${id} record.`);
        done();
      });
  });

  it('expect DELETE :id to return error if reset token primary key id not found', (done) => {
    let id = 1;

    chai
      .request(server)
      .delete(`/api/confirm-email-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(501);
        expect(response.body).to.have.property('message').to.equals(`SERVICE ERROR: Confirm email token ${id} was not found to destroy.`);
        done();
      });
  });

});
