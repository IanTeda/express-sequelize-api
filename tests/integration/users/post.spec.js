import { users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);

describe('Integration :: Users :: POST', () => {
  // Thing instance to reference in testing
  let testUser;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testUser = await usersFactory();
  });

  it('expect POST to create and return a created thing', (done) => {
    let testData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123',
      status: 'active',
    };

    chai
      .request(server)
      .post('/api/users')
      .set({ Authorization: `Bearer ${testUser.token}` })
      .type('form')
      .send(testData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: User ${res.body.data.id} created.`);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('firstName').to.equal(testData.firstName);
        expect(res.body.data).to.have.property('lastName').to.equal(testData.lastName);
        expect(res.body.data).to.have.property('email').to.equal(testData.email);
        expect(res.body.data).to.have.property('status').to.equal(testData.status);
        expect(res.body.data).to.have.property('isEmailConfirmed').to.be.false; // Default false on creating
        expect(res.body.data).to.not.have.property('password');
        expect(res.body.data).to.not.have.property('salt');
        done();
      });
  });
});
