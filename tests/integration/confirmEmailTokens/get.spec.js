import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Unit :: Integration :: Confirm Email Token :: GET', () => {
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

  it('expect GET to return all reset tokens.', (done) => {
    chai
      .request(server)
      .get('/api/confirm-email-tokens')
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all confirm email token records.`);
        expect(res.body).to.have.property('data').to.be.a('array');
        done();
      });
  });

  it('expect GET :id to return a reset token for a given primary key id.', (done) => {
    const id = confirmEmailTokenInstance.id;

    chai
      .request(server)
      .get(`/api/confirm-email-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message').to.equals(`SUCCESS: Retrieved confirm email token ${id} record.`);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id').to.equal(confirmEmailTokenInstance.id);
        expect(response.body.data).to.have.property('UserId').to.equal(confirmEmailTokenInstance.UserId);
        expect(response.body.data).to.have.property('token').to.equal(confirmEmailTokenInstance.token);
        expect(response.body.data).to.have.property('expiration');
        done();
      });
  });

  it('expect GET :id to return error if reset token primary key id is not found.', (done) => {
    const id = 1;

    chai
      .request(server)
      .get(`/api/confirm-email-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(501);
        expect(res.body).to.have.property('message').to.equals(`SERVICE ERROR: Confirm email token with id ${id} was not found.`);
        done();
      });
  });

});
