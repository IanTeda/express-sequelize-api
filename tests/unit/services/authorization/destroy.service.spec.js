import { expect } from 'chai';
import { authorizations as authorizationsService } from '../../../../src/services';
import { authorizations as authorizationsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Authorizations :: Destroy', () => {
  // Thing instance to reference in testing
  let authorizationTestInstance;

  beforeEach('truncate all database tables and create authorizationTestInstance', async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    authorizationTestInstance = await authorizationsFactory();
  });

  describe('01. Methods:', () => {
    it('expect destroyOneByPk to return number of rows deleted', async () => {
      const primaryKey = authorizationTestInstance.id;

      // await is important because a promise is returned by the service
      let rowsDestroyed = await authorizationsService.destroyOneByPk(primaryKey);

      expect(rowsDestroyed).to.be.at.least(1);
    });

    it('expect destroyAll to return number of rows deleted', async () => {
      await authorizationsFactory();
      await authorizationsFactory();

      // await is important because a promise is returned by the service
      let rowsDestroyed = await authorizationsService.destroyAll();

      // Test instance plus two other
      expect(rowsDestroyed).to.be.at.equal(3);
    });
  });

  describe('02. Errors:', () => {
    it('expect destroyOneByPk to throw an error if ID cannot be found', (done) => {
      const primaryKey = 1;

      authorizationsService
        .destroyOneByPk(primaryKey)
        .catch((err) => {
          expect(err.message).to.equal(`SERVICE ERROR: Authorization ${primaryKey} was not found to destroy.`);
          expect(err.statusCode).to.equal(500);
        })
        .then(done, done);
    });

    it('expect destroyOneByPk to throw an error if ID is null', (done) => {
      const primaryKey = null;

      authorizationsService
        .destroyOneByPk(primaryKey)
        .catch((err) => {
          expect(err.message).to.equal(`SERVICE ERROR: No primary key id provided in Authorization destroy request.`);
          expect(err.statusCode).to.equal(500);
        })
        .then(done, done);
    });

    it('expect destroyOneByPk to throw an error if ID is empty', (done) => {
      const primaryKey = '';

      authorizationsService
        .destroyOneByPk(primaryKey)
        .catch((err) => {
          expect(err.message).to.equal(`SERVICE ERROR: No primary key id provided in Authorization destroy request.`);
          expect(err.statusCode).to.equal(500);
        })
        .then(done, done);
    });
  });
});
