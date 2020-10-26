import { expect } from 'chai';
import { things as thingsService } from '../../../../src/services';
import { things as thingsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Units :: Services :: Things :: Destroy', () => {
  // Thing instance to reference in testing
  let testThingInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testThingInstance = await thingsFactory();
  });

  it('expect destroyOneByPk to return number of rows deleted', async () => {
    // await is important because a promise is returned by the service
    let rowsDestroyed = await thingsService.destroyOneByPk(testThingInstance.id);

    expect(rowsDestroyed).to.be.at.least(1);
  });

  it('expect destroyOneByPk to throw an error if ID cannot be found', (done) => {
    const id = 1;

    thingsService
      .destroyOneByPk(id)
      .catch((err) => {
        expect(err.message).to.equal(`SERVICE ERROR: Thing ${id} was not found to destroy.`);
        expect(err.statusCode).to.equal(501);
      })
      .then(done, done);
  });

  it('expect destroyAll to return number of rows deleted', async () => {

    await thingsFactory();
    await thingsFactory();

    // await is important because a promise is returned by the service
    let rowsDestroyed = await thingsService.destroyAll();

    // Test instance plus two other
    expect(rowsDestroyed).to.be.at.equal(3);
  });
});
