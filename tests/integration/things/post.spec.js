
import { things as thingsFactory, users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';
import faker from 'faker';

chai.use(chaiHttp);

describe('Integration :: Things :: POST', () => {
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

  it('expect POST to create and return a thing', (done) => {
    let thingData = {
      name: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      price: faker.commerce.price(1.0, 78.0, 2, ''),
    };

    chai
      .request(server)
      .post('/api/things')
      .set({ Authorization: `Bearer ${testUser.token}` })
      .type('form')
      .send(thingData)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').to.equals(`SUCCESS: Thing ${res.body.data.id} created.`);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('name').to.equal(thingData.name);
        expect(res.body.data).to.have.property('description').to.equal(thingData.description);
        expect(res.body.data).to.have.property('price').to.equal(thingData.price);
        done();
      });
  });

  it('expect POST to return error if thing.name is empty', (done) => {
    let thingData = {
      name: '',
      description: faker.commerce.productAdjective(),
      price: faker.commerce.price(1.0, 78.0, 2, ''),
    };

    chai
      .request(server)
      .post(`/api/things`)
      .set({ Authorization: `Bearer ${testUser.token}` })
      .type('form')
      .send(thingData)
      .end((error, response) => {
        expect(error).to.be.null;
        expect(response).to.have.status(501);
        expect(response.body).to.have.property('message').to.equals(`CONTROLLER ERROR: Your create thing request did not contain a name, description or price.`);
        done();
      });
  });

});
