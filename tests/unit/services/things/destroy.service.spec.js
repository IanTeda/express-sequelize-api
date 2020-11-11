import { expect } from 'chai';
import { things as thingsService } from '../../../../src/services';
import { things as thingsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Things :: Destroy', () => {
  // Thing instance to reference in testing
  let testThingInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testThingInstance = await thingsFactory();
  });

  describe('01. Methods:', () => {
    it('expect destroyOneByPk to return number of rows deleted', async () => {
      // await is important because a promise is returned by the service
      let rowsDestroyed = await thingsService.destroyOneByPk(testThingInstance.id);

      expect(rowsDestroyed).to.be.at.least(1);
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

  describe('02. Errors:', () => {
    it('expect destroyOneByPk to throw an error if ID cannot be found', (done) => {
      const id = 1;

      thingsService
        .destroyOneByPk(id)
        .catch((err) => {
          expect(err.message).to.equal(`SERVICE ERROR: Thing ${id} was not found to destroy.`);
          expect(err.statusCode).to.equal(500);
        })
        .then(done, done);
    });

    it('expect destroyOneByPk to throw an error if ID is null', (done) => {
      const id = null;

      thingsService
        .destroyOneByPk(id)
        .catch((err) => {
          expect(err.message).to.equal(`SERVICE ERROR: No primary key id provided in Thing destroy request.`);
          expect(err.statusCode).to.equal(500);
        })
        .then(done, done);
    });

    it('expect destroyOneByPk to throw an error if ID is empty', (done) => {
      const id = '';

      thingsService
        .destroyOneByPk(id)
        .catch((err) => {
          expect(err.message).to.equal(`SERVICE ERROR: No primary key id provided in Thing destroy request.`);
          expect(err.statusCode).to.equal(500);
        })
        .then(done, done);
    });
  });
});
