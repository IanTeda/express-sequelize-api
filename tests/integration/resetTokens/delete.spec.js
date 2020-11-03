import { resetTokens as resetTokensFactory, users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Integration :: ResetTokens :: DELETE', () => {
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

  it('expect DELETE :id to delete reset token with primary key ID', (done) => {
    chai
      .request(server)
      .delete(`/api/reset-tokens/${resetTokenTestInstance.id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message').to.equals(`SUCCESS: Destroyed reset token ${resetTokenTestInstance.id} record.`);
        done();
      });
  });

  it('expect DELETE :id to return error if reset token primary key id not found', (done) => {
    let id = 1;

    chai
      .request(server)
      .delete(`/api/reset-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(501);
        expect(response.body).to.have.property('message').to.equals(`SERVICE ERROR: Reset token ${id} was not found to destroy.`);
        done();
      });
  });
});
