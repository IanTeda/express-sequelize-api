import { expect } from 'chai';
import { things as thingsService } from '../../../../src/services';
import { things as thingsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Things :: Find', () => {
  // Thing instance to reference in testing
  let testThing;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testThing = await thingsFactory();
  });

  it('expect findAll things to return array of things', async () => {
    const allThings = await thingsService.findAll();

    // TODO Need a better test
    expect(allThings).to.be.an('array');
  });

  it('expect findOneByPk thing to return a thing for the ID', async () => {
    const thing = await thingsService.findOneByPk(testThing.id);

    expect(thing.id).to.equal(testThing.id);
    expect(thing.name).to.equal(testThing.name);
    expect(thing.description).to.equal(testThing.description);
    expect(thing.price).to.equal(testThing.price);
  });

  it('expect findOneByPk to throw an error when no ID provided', (done) => {
    thingsService
      .findOneByPk()
      .catch((err) => {
        expect(err.message).to.equal('SERVICE ERROR: No id provided in Thing find request.');
        expect(err.statusCode).to.equal(500);
      })
      .then(done, done);
  });

  it('expect findOneByPk to throw an error if ID cannot be found', (done) => {
    const id = 1;

    thingsService
      .findOneByPk(id)
      .catch((err) => {
        expect(err.message).to.equal(`SERVICE ERROR: Thing ${id} was not found.`);
        expect(err.statusCode).to.equal(500);
      })
      .then(done, done);
  });
});
