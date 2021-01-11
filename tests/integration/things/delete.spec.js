import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../src/app';
import { things as thingsFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Integration :: Things :: DELETE', () => {
  // Thing instance to reference in testing
  let testThing;
  let testUser;

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create and assign new thing
    testThing = await thingsFactory();
    testUser = await usersFactory();
  });

  it('expect DELETE :id to delete ID thing', (done) => {
    chai
      .request(server)
      .delete(`/api/things/${testThing.id}`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Destroyed thing ${testThing.id} record.`);
        done();
      });
  });

  it('expect DELETE :id to return error if ID not found', (done) => {
    let id = 1;

    chai
      .request(server)
      .delete(`/api/things/${id}`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(500);
        expect(res.body).to.have.property('message').to.equals(`SERVICE ERROR: Thing ${id} was not found to destroy.`);
        done();
      });
  });

  it('expect DELETE :id to return 404 if ID not specified', (done) => {
    chai
      .request(server)
      .delete(`/api/things/`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').to.equals(`NOT FOUND: Endpoint (DELETE) '/api/things/' not found.`);
        done();
      });
  });
});
