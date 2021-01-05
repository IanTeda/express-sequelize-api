import { expect } from 'chai';
import faker from 'faker';
import { permissions, resources, roles } from '../../../../src/configs';
import { authorizations as authorizationsService } from '../../../../src/services';
import { authorizations as authorizationsFactory } from '../../../factories';
import randomListItem from '../../../random-list-item';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Authorizations :: Create', () => {
  // Thing instance to reference in testing
  let authorizationTestInstance;

  beforeEach('truncate all database tables and create authorizationTestInstance', async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    authorizationTestInstance = await authorizationsFactory();
  });

  it('expect createOne to return a created authorization', async () => {
    const fakeAuthorizationData = {
      role: randomListItem(roles),
      userId: faker.random.number(100),
      resource: randomListItem(resources),
      resourceId: faker.random.number(100),
      permission: randomListItem(permissions),
    };

    const createdAuthorization = await authorizationsService.createOne(fakeAuthorizationData);

    expect(createdAuthorization).to.have.property('id');
    expect(createdAuthorization).to.have.property('role').to.be.equal(fakeAuthorizationData.role);
    expect(createdAuthorization).to.have.property('userId').to.be.equal(fakeAuthorizationData.userId);
    expect(createdAuthorization).to.have.property('resource').to.be.equal(fakeAuthorizationData.resource);
    expect(createdAuthorization).to.have.property('resourceId').to.be.equal(fakeAuthorizationData.resourceId);
    expect(createdAuthorization).to.have.property('permission').to.be.equal(fakeAuthorizationData.permission);
  });

  it('expect createOne to throw an error if no data is sent', (done) => {
    authorizationsService
      .createOne()
      .catch((err) => {
        expect(err.message).to.equal('SERVICE ERROR: Authorization createOne contained no data.');
        expect(err.statusCode).to.equal(400);
      })
      .then(done, done);
  });
});
