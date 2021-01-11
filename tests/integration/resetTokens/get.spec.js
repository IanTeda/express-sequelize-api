import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/app';
import { resetTokens as resetTokensFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Integration :: ResetTokens :: GET', () => {
  /** Reset Token test instance to reference */
  let resetTokenTestInstance;
  /** User test instance for reference*/
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

  it('expect GET to return all reset tokens.', (done) => {
    chai
      .request(server)
      .get('/api/reset-tokens')
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all reset token records.`);
        expect(res.body).to.have.property('data').to.be.a('array');
        done();
      });
  });

  it('expect GET :id to return a reset token for a given primary key id.', (done) => {
    const id = resetTokenTestInstance.id;

    chai
      .request(server)
      .get(`/api/reset-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message').to.equals(`SUCCESS: Retrieved reset token ${id} record.`);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id').to.equal(resetTokenTestInstance.id);
        expect(response.body.data).to.have.property('UserId').to.equal(resetTokenTestInstance.UserId);
        expect(response.body.data).to.have.property('token').to.equal(resetTokenTestInstance.token);
        expect(response.body.data).to.have.property('expiration');
        expect(response.body.data).to.have.property('isUsed').to.equal(resetTokenTestInstance.isUsed);
        done();
      });
  });

  it('expect GET :id to return error if reset token primary key id is not found.', (done) => {
    const id = 1;

    chai
      .request(server)
      .get(`/api/reset-tokens/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').to.equals(`SERVICE ERROR: Reset token ${id} was not found.`);
        done();
      });
  });
});
