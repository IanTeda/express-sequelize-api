import { users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);

describe('Integration :: Users :: DELETE', () => {
  // Thing instance to reference in testing
  let testUser;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testUser = await usersFactory();
  });

  it('expect DELETE :id to delete ID thing', (done) => {
    chai
      .request(server)
      .delete(`/api/users/${testUser.id}`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed user ${testUser.id} record.`);
        done();
      });
  });

  it('expect DELETE :id to return error if ID not found', (done) => {
    let id = 1;

    chai
      .request(server)
      .delete(`/api/users/${id}`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').to.equals(`SERVICE ERROR: User ${id} was not found to destroy.`);
        done();
      });
  });
});
