import { users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);

describe('Integration :: Users :: GET', () => {
  // Thing instance to reference in testing
  let testUser;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testUser = await usersFactory();
  });

  it('expect GET to return users', (done) => {
    chai
      .request(server)
      .get('/api/users')
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all users records.`);
        expect(res.body).to.have.property('data').to.be.a('array');
        done();
      });
  });

  it('expect GET :id to return a user with ID', (done) => {
    chai
      .request(server)
      .get(`/api/users/${testUser.id}`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved user ${testUser.id} record.`);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id').to.equal(testUser.id);
        expect(res.body.data).to.have.property('firstName').to.equal(testUser.firstName);
        expect(res.body.data).to.have.property('lastName').to.equal(testUser.lastName);
        expect(res.body.data).to.have.property('email').to.equal(testUser.email);
        expect(res.body.data).to.have.property('status').to.equal(testUser.status);
        expect(res.body.data).to.have.property('isEmailConfirmed').to.equal(testUser.isEmailConfirmed);
        expect(res.body.data).to.not.have.property('password');
        expect(res.body.data).to.not.have.property('salt');
        done();
      });
  });
});
