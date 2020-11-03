import { things as thingsFactory, users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);

describe('Integration :: Things :: GET', () => {
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

  it('expect GET to return things', (done) => {
    chai
      .request(server)
      .get('/api/things')
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved all things records.`);
        expect(res.body).to.have.property('data').to.be.a('array');
        done();
      });
  });

  it('expect GET :id to return ID thing', (done) => {
    chai
      .request(server)
      .get(`/api/things/${testThing.id}`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Retrieved thing ${testThing.id} record.`);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id').to.equal(testThing.id);
        expect(res.body.data).to.have.property('name').to.equal(testThing.name);
        expect(res.body.data).to.have.property('description').to.equal(testThing.description);
        expect(res.body.data).to.have.property('price').to.equal(testThing.price);
        done();
      });
  });

  it('expect GET :id to return error if ID not found', (done) => {
    let id = 1;

    chai
      .request(server)
      .get(`/api/things/${id}`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(501);
        expect(res.body).to.have.property('message').to.equals(`SERVICE ERROR: Thing ${id} was not found.`);
        done();
      });
  });

});
