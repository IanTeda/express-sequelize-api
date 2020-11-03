import { things as thingsFactory, users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);

describe('Integration :: Things :: PUT', () => {
  // Thing instance to reference in testing
  let thingTestInstance;
  let userTestInstance;

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create and assign new thing
    thingTestInstance = await thingsFactory();
    userTestInstance = await usersFactory();
  });

  it('expect PUT :id to update ID thing', (done) => {
    let id = thingTestInstance.id;

    let thingUpdate = {
      name: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      price: faker.commerce.price(1.0, 78.0, 2, ''),
    };

    chai
      .request(server)
      .put(`/api/things/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(thingUpdate)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(201);
        expect(response.body).to.have.property('message').to.equals(`SUCCESS: Updated thing with id=${id} record.`);
        expect(response.body).to.have.property('data');
        expect(response.body.data).to.have.property('id');
        expect(response.body.data).to.have.property('name').to.equal(thingUpdate.name);
        expect(response.body.data).to.have.property('description').to.equal(thingUpdate.description);
        expect(response.body.data).to.have.property('price').to.equal(thingUpdate.price);
        done();
      });
  });

  it('expect PUT :id to return error if ID not found', (done) => {
    let id = 1;

    let thingUpdateData = {
      name: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      price: faker.commerce.price(1.0, 78.0, 2, ''),
    };

    chai
      .request(server)
      .put(`/api/things/${id}`)
      .set({ Authorization: `Bearer ${userTestInstance.token}` })
      .type('form')
      .send(thingUpdateData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(501);
        expect(response.body).to.have.property('message').to.equals(`SERVICE ERROR: Thing ${id} was not found.`);
        done();
      });
  });

});
