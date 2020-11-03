import { expect } from 'chai';
import faker from 'faker';
import { things as thingsService } from '../../../../src/services';
import { things as thingsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Things :: Update', () => {
  // Thing instance to reference in testing
  let testThing;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testThing = await thingsFactory();
  });

  it('expect updateOneByPk to return an updated thing', async () => {
    const updateData = {
      name: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      price: faker.commerce.price(1.0, 78.0, 2, ''),
    };

    const updatedThing = await thingsService.updateOneByPk(testThing.id, updateData);

    expect(updatedThing).to.have.property('id').to.equal(testThing.id);
    expect(updatedThing).to.have.property('name').to.equal(updateData.name);
    expect(updatedThing).to.have.property('description').to.equal(updateData.description);
    expect(updatedThing).to.have.property('price').to.equal(updateData.price);
  });

  it('expect updateOneByPk to throw an error if ID cannot be found', (done) => {
    const id = 1;

    const updateData = {
      name: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      price: faker.commerce.price(1.0, 78.0, 2, ''),
    };

    thingsService
      .updateOneByPk(id, updateData)
      .catch((err) => {
        expect(err.message).to.equal(`SERVICE ERROR: Thing ${id} was not found.`);
        expect(err.statusCode).to.equal(501);
      })
      .then(done, done);
  });

  it('expect updateOneByPk to throw an error if only one update parameter is sent', (done) => {
    thingsService
      .updateOneByPk(testThing.id)
      .catch((err) => {
        expect(err.message).to.equal('SERVICE ERROR: Insufficient parameters in Thing update request.');
        expect(err.statusCode).to.equal(501);
      })
      .then(done, done);
  });
});
