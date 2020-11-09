import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import chaiHttp from 'chai-http';
import server from '../../../src/app';
import { users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';


chai.use(chaiHttp);
chai.use(chaiDateTime);

describe('Integration :: Authentication :: Forgot Password', () => {
  let userTestInstance;

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create and assign new thing
    userTestInstance = await usersFactory();
  });

  it('expect "/api/forgot-password" to return success.', (done) => {
    // Set login form data
    const formData = {
      email: userTestInstance.email
    };

    chai
      .request(server)
      .post('/api/forgot-password')
      .type('form')
      .send(formData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Reset token sent to <${userTestInstance.email}>.`);
        done();
      });
  });

  it('expect "/api/forgot-password" to return error on no email.', (done) => {
    // Set login form data
    const formData = {
      email: ''
    };

    chai
      .request(server)
      .post('/api/forgot-password')
      .type('form')
      .send(formData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').to.equals(`FORGOT PASSWORD ERROR: Reset token was not sent.`);
        done();
      });
  });

});
