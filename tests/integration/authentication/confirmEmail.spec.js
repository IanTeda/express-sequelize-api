import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);

describe('Integration :: Authentication :: Confirm Email', () => {
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

  it('expect "/api/confirm" to return success message', (done) => {
    const token = confirmEmailTokenInstance.token;
    const UserId = confirmEmailTokenInstance.UserId;

    chai
      .request(server)
      .post(`/api/confirm?token=${token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`CONFIRM EMAIL: Email address for user ${UserId} has been confirmed.`);
        done();
      });
  });

  it('expect "/api/confirm" to return error message on random token', (done) => {
    const token = faker.random.alphaNumeric(32);

    chai
      .request(server)
      .post(`/api/confirm?token=${token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').to.equals(`SERVICE ERROR: Confirm email token ${token} could not be found.`);
        done();
      });
  });

  it('expect "/api/confirm" to return error message when no query', (done) => {
    chai
      .request(server)
      .post(`/api/confirm`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').to.equals(`CONFIRM EMAIL ERROR: Request did not contain a token.`);
        done();
      });
  });
});
