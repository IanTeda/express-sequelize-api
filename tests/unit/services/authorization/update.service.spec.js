import { expect } from 'chai';
import faker from 'faker';
import { permissions, resources, roles } from '../../../../src/configs';
import { authorizations as authorizationsService } from '../../../../src/services';
import { authorizations as authorizationsFactory } from '../../../factories';
import randomListItem from '../../../random-list-item';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Authorizations :: Update', () => {
  // Thing instance to reference in testing
  let authorizationTestInstance;

  beforeEach('Truncate all database tables and create authorizationTestInstance', async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    authorizationTestInstance = await authorizationsFactory();
  });

  it('expect updateOneByPk to return an updated thing', async () => {
    const primaryKey = authorizationTestInstance.id;

    const authorizationUpdateData = {
      role: randomListItem(roles),
      userId: faker.random.number(100),
      resource: randomListItem(resources),
      resourceId: faker.random.number(100),
      permission: randomListItem(permissions),
    };

    const updatedAuthorization = await authorizationsService.updateOneByPk(primaryKey, authorizationUpdateData);

    expect(updatedAuthorization).to.have.property('id').to.be.equal(primaryKey);
    expect(updatedAuthorization).to.have.property('role').to.be.equal(authorizationUpdateData.role);
    expect(updatedAuthorization).to.have.property('userId').to.be.equal(authorizationUpdateData.userId);
    expect(updatedAuthorization).to.have.property('resource').to.be.equal(authorizationUpdateData.resource);
    expect(updatedAuthorization).to.have.property('resourceId').to.be.equal(authorizationUpdateData.resourceId);
    expect(updatedAuthorization).to.have.property('permission').to.be.equal(authorizationUpdateData.permission);
  });

  it('expect updateOneByPk to throw an error if ID cannot be found', (done) => {
    const primaryKey = 1;

    const authorizationUpdateData = {
      role: randomListItem(roles),
      userId: faker.random.number(100),
      resource: randomListItem(resources),
      resourceId: faker.random.number(100),
      permission: randomListItem(permissions),
    };

    authorizationsService
      .updateOneByPk(primaryKey, authorizationUpdateData)
      .catch((err) => {
        expect(err.message).to.equal(`SERVICE ERROR: Authorization ${primaryKey} was not found.`);
        expect(err.statusCode).to.equal(500);
      })
      .then(done, done);
  });

  it('expect updateOneByPk to throw an error if only one update parameter is sent', (done) => {
    const primaryKey = authorizationTestInstance.id;

    authorizationsService
      .updateOneByPk(primaryKey)
      .catch((err) => {
        expect(err.message).to.equal('SERVICE ERROR: Insufficient parameters in Authorization update request.');
        expect(err.statusCode).to.equal(500);
      })
      .then(done, done);
  });
});
