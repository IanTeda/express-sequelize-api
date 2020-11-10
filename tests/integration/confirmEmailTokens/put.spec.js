import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Unit :: Integration :: Confirm Email Token :: PUT', () => {
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


  it('expect PUT :id to update ID thing', (done) => {
    const id = confirmEmailTokenInstance.id;

    const formData = {
      email: userTestInstance.email,
      expiration: new Date(),
    };

    chai
      .request(server)
      .put(`/api/confirm-email-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(formData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated reset token ${id} record.`);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id').to.equal(id);
        expect(response.body.data).to.have.property('UserId').to.equal(userTestInstance.id);
        expect(response.body.data).to.have.property('token');
        expect(response.body.data).to.have.property('expiration');
        done();
      });
  });

  it('expect PUT :id to return error if ID not found', (done) => {
    let id = 1;

    const formData = {
      email: userTestInstance.email,
      expiration: new Date(),
    };

    chai
      .request(server)
      .put(`/api/confirm-email-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(formData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(501);
        expect(response.body).to.have.property('message').to.equals(`SERVICE ERROR: Confirm email token ${id} was not found to update.`);
        done();
      });
  });

});
