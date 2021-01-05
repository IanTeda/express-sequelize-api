import { expect } from 'chai';
import { authorizations as authorizationsService } from '../../../../src/services';
import { authorizations as authorizationsFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Authorizations :: Find', () => {
  // Thing instance to reference in testing
  let authorizationTestInstance;

  beforeEach('truncate all database tables and create authorizationTestInstance', async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    authorizationTestInstance = await authorizationsFactory();
  });

  it('expect findAll things to return array of things', async () => {
    const allAuthorizations = await authorizationsService.findAll();

    // TODO Need a better test
    expect(allAuthorizations).to.be.an('array');
  });

  it('expect findOneByPk thing to return a thing for the ID', async () => {
    const primaryKey = authorizationTestInstance.id;

    const authorization = await authorizationsService.findOneByPk(primaryKey);

    expect(authorization).to.have.property('id').to.be.equal(authorizationTestInstance.id);
    expect(authorization).to.have.property('role').to.be.equal(authorizationTestInstance.role);
    expect(authorization).to.have.property('userId').to.be.equal(authorizationTestInstance.userId);
    expect(authorization).to.have.property('resource').to.be.equal(authorizationTestInstance.resource);
    expect(authorization).to.have.property('resourceId').to.be.equal(authorizationTestInstance.resourceId);
    expect(authorization).to.have.property('permission').to.be.equal(authorizationTestInstance.permission);
  });

  it('expect findOneByPk to throw an error when no ID provided', (done) => {
    authorizationsService
      .findOneByPk()
      .catch((error) => {
        expect(error.message).to.equal('SERVICE ERROR: No primary key provided in Authorization find request.');
        expect(error.statusCode).to.equal(400);
      })
      .then(done, done);
  });

  it('expect findOneByPk to throw an error if ID cannot be found', (done) => {
    const primaryKey = 1;

    authorizationsService
      .findOneByPk(primaryKey)
      .catch((err) => {
        expect(err.message).to.equal(`SERVICE ERROR: Authorization ${primaryKey} was not found.`);
        expect(err.statusCode).to.equal(500);
      })
      .then(done, done);
  });
});
