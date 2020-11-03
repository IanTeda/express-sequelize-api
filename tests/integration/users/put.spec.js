import { users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);

describe('Integration :: Users :: PUT', () => {
  // Thing instance to reference in testing
  let testUser;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testUser = await usersFactory();
  });

  it('expect PUT :id to update ID thing', (done) => {
    let id = testUser.id;

    let testData = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: 'password123',
      status: 'active',
      isEmailConfirmed: faker.random.boolean(),
    };

    chai
      .request(server)
      .put(`/api/users/${id}`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .type('form')
      .send(testData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated user with id=${id} record.`);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('firstName').to.equal(testData.firstName);
        expect(response.body.data).to.have.property('lastName').to.equal(testData.lastName);
        expect(response.body.data).to.have.property('email').to.equal(testData.email);
        expect(response.body.data).to.have.property('status').to.equal(testData.status);
        expect(response.body.data).to.have.property('isEmailConfirmed').to.equal(testData.isEmailConfirmed);
        expect(response.body.data).to.not.have.property('password');
        expect(response.body.data).to.not.have.property('salt');
        done();
      });
  });
});
