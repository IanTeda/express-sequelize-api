import { resetTokens as resetTokensFactory, users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);

describe('Integration :: ResetTokens :: PUT', () => {
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

  it('expect PUT :id to update ID thing', (done) => {
    const id = resetTokenTestInstance.id;

    const resetTokenData = {
      email: faker.internet.email(),
      expiration: new Date(),
      isUsed: faker.random.boolean(),
    };

    chai
      .request(server)
      .put(`/api/reset-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(resetTokenData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated reset token ${id} record.`);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id').to.equal(id);
        expect(response.body.data).to.have.property('UserId').to.equal(resetTokenTestInstance.UserId);
        expect(response.body.data).to.have.property('token');
        expect(response.body.data).to.have.property('expiration');
        expect(response.body.data).to.have.property('isUsed').to.equal(resetTokenData.isUsed);
        done();
      });
  });

  it('expect PUT :id to return error if ID not found', (done) => {
    let id = 1;

    const resetTokenData = {
      email: faker.internet.email(),
      expiration: new Date(),
      isUsed: faker.random.boolean(),
    };

    chai
      .request(server)
      .put(`/api/reset-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(resetTokenData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(401); // Dealing with authorization so return 401
        expect(response.body).to.have.property('message').to.equals(`SERVICE ERROR: Reset token ${id} was not found to update.`);
        done();
      });
  });
});
