import { expect } from 'chai';
import faker from 'faker';
import { Authorization } from '../../../src/database';
import { authorizations as authorizationsFactory } from '../../factories';
import truncate from '../../truncate-database';
import { roles, resources, permissions } from '../../../src/configs';

const _randomListItem = (list) => {
  // Get a random number between 0 an 1 and multiple by the length of the array
  let percentage = Math.random();

  // Count the number of list values
  const count = Object.values(list).length;

  // Using floor to round downward the nearest integer
  let randomListNumber = Math.floor(percentage * count);

  // Random array value
  const randomListValue = Object.values(list)[randomListNumber];

  // Return random value
  return randomListValue;
} 

describe('Unit :: Database :: Models :: Authorization', () => {
  // Test instance to reference in testing
  let authorizationTestInstance;

  beforeEach('test truncate database tables and create new test instance', async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    authorizationTestInstance = await authorizationsFactory();
  });

  describe('01. Authorization Sequelize Function Checks:', () => {

    it('expect Authorization.create to return a created authorization with correlating properties', async () => {
      const fakeAuthorizationData = {
        role: _randomListItem(roles),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      // Create user
      const createdAuthorization = await Authorization.create(fakeAuthorizationData);

      // Set expectations
      expect(createdAuthorization).to.have.property('id');
      expect(createdAuthorization).to.have.property('role').to.be.equal(fakeAuthorizationData.role);
      expect(createdAuthorization).to.have.property('userId').to.be.equal(fakeAuthorizationData.userId);
      expect(createdAuthorization).to.have.property('resource').to.be.equal(fakeAuthorizationData.resource);
      expect(createdAuthorization).to.have.property('resourceId').to.be.equal(fakeAuthorizationData.resourceId);
      expect(createdAuthorization).to.have.property('permission').to.be.equal(fakeAuthorizationData.permission);

    });

    it('expect Authorization.findAll to return an array of found authorizations', async () => {

      await authorizationsFactory();
      await authorizationsFactory();

      const foundAuthorizations = await Authorization.findAll();

      expect(foundAuthorizations).to.be.an('Array');
      expect(foundAuthorizations.length).to.be.equal(3);

      expect(foundAuthorizations[0]).to.have.property('id').to.be.equal(authorizationTestInstance.id);
      expect(foundAuthorizations[0]).to.have.property('role').to.be.equal(authorizationTestInstance.role);
      expect(foundAuthorizations[0]).to.have.property('userId').to.be.equal(authorizationTestInstance.userId);
      expect(foundAuthorizations[0]).to.have.property('resource').to.be.equal(authorizationTestInstance.resource);
      expect(foundAuthorizations[0]).to.have.property('resourceId').to.be.equal(authorizationTestInstance.resourceId);
      expect(foundAuthorizations[0]).to.have.property('permission').to.be.equal(authorizationTestInstance.permission);

    });

    it('expect Authorization.findByPk to return an authorization based on a primary key id', async () => {

      const primaryKey = authorizationTestInstance.id

      const foundAuthorization = await Authorization.findByPk(primaryKey);

      expect(foundAuthorization).to.have.property('id').to.be.equal(authorizationTestInstance.id);
      expect(foundAuthorization).to.have.property('role').to.be.equal(authorizationTestInstance.role);
      expect(foundAuthorization).to.have.property('userId').to.be.equal(authorizationTestInstance.userId);
      expect(foundAuthorization).to.have.property('resource').to.be.equal(authorizationTestInstance.resource);
      expect(foundAuthorization).to.have.property('resourceId').to.be.equal(authorizationTestInstance.resourceId);
      expect(foundAuthorization).to.have.property('permission').to.be.equal(authorizationTestInstance.permission);

    });

    it('expect Authorization.find to return the first found authorization based on role query', async () => {

      const role = authorizationTestInstance.role;

      const foundAuthorization = await Authorization.findOne({
        where: {
          role: role
        }
      })

      expect(foundAuthorization).to.have.property('id').to.be.equal(authorizationTestInstance.id);
      expect(foundAuthorization).to.have.property('role').to.be.equal(authorizationTestInstance.role);
      expect(foundAuthorization).to.have.property('userId').to.be.equal(authorizationTestInstance.userId);
      expect(foundAuthorization).to.have.property('resource').to.be.equal(authorizationTestInstance.resource);
      expect(foundAuthorization).to.have.property('resourceId').to.be.equal(authorizationTestInstance.resourceId);
      expect(foundAuthorization).to.have.property('permission').to.be.equal(authorizationTestInstance.permission);

    });

    it('expect Authorization.findOrCreate to return the found authorization based on name query', async () => {

      const primaryKeyId = authorizationTestInstance.id;

      const fakeAuthorizationData = {
        role: _randomListItem(roles),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      const [foundOrCreatedAuthorization, isCreated] = await Authorization.findOrCreate({
        where: {
          id: primaryKeyId,
        },
        defaults: fakeAuthorizationData,
      });

      expect(isCreated).to.be.false;
      expect(foundOrCreatedAuthorization).to.have.property('id').to.be.equal(authorizationTestInstance.id);
      expect(foundOrCreatedAuthorization).to.have.property('role').to.be.equal(authorizationTestInstance.role);
      expect(foundOrCreatedAuthorization).to.have.property('userId').to.be.equal(authorizationTestInstance.userId);
      expect(foundOrCreatedAuthorization).to.have.property('resource').to.be.equal(authorizationTestInstance.resource);
      expect(foundOrCreatedAuthorization).to.have.property('resourceId').to.be.equal(authorizationTestInstance.resourceId);
      expect(foundOrCreatedAuthorization).to.have.property('permission').to.be.equal(authorizationTestInstance.permission);
    });

    it('expect Authorization.findOrCreate to return created authorization and isCreated true when ID can not be found', async () => {
      const primaryKeyId = 1;

      const fakeAuthorizationData = {
        role: _randomListItem(roles),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      const [foundOrCreatedAuthorization, isCreated] = await Authorization.findOrCreate({
        where: {
          id: primaryKeyId,
        },
        defaults: fakeAuthorizationData,
      });

      expect(isCreated).to.be.true;
      expect(foundOrCreatedAuthorization).to.have.property('id').to.be.ok;
      expect(foundOrCreatedAuthorization).to.have.property('role').to.be.equal(fakeAuthorizationData.role);
      expect(foundOrCreatedAuthorization).to.have.property('userId').to.be.equal(fakeAuthorizationData.userId);
      expect(foundOrCreatedAuthorization).to.have.property('resource').to.be.equal(fakeAuthorizationData.resource);
      expect(foundOrCreatedAuthorization).to.have.property('resourceId').to.be.equal(fakeAuthorizationData.resourceId);
      expect(foundOrCreatedAuthorization).to.have.property('permission').to.be.equal(fakeAuthorizationData.permission);
    });

    it('expect Authorization.findAndCountAll to return count of authorizations and array of found authorizations', async () => {

      await authorizationsFactory();
      await authorizationsFactory();

      const { count: countFoundAuthorizations, rows: foundAuthorizations } = await Authorization.findAndCountAll();

      expect(countFoundAuthorizations).to.be.equal(3);

      expect(foundAuthorizations).to.be.an('Array');
      expect(foundAuthorizations.length).to.be.equal(3);
      expect(foundAuthorizations[0]).to.have.property('id').to.be.equal(authorizationTestInstance.id);
      expect(foundAuthorizations[0]).to.have.property('role').to.be.equal(authorizationTestInstance.role);
      expect(foundAuthorizations[0]).to.have.property('userId').to.be.equal(authorizationTestInstance.userId);
      expect(foundAuthorizations[0]).to.have.property('resource').to.be.equal(authorizationTestInstance.resource);
      expect(foundAuthorizations[0]).to.have.property('resourceId').to.be.equal(authorizationTestInstance.resourceId);
      expect(foundAuthorizations[0]).to.have.property('permission').to.be.equal(authorizationTestInstance.permission);


    });

    it('expect Authorization.destroy to return number of authorizations destroyed', async () => {
      // Id of user to destroy
      const primaryKeyId = authorizationTestInstance.id;

      // Count destroyed users
      const countDestroyedAuthorizations = await Authorization.destroy({
        where: {
          id: primaryKeyId,
        },
      });

      // Set expectations for counted destroyed users
      expect(countDestroyedAuthorizations).to.equal(1);
    });

  });

  describe('02. Authorization Validation Checks:', () => {

    // const fakeAuthorizationData = {
    //   role: _randomListItem(roles),
    //   userId: faker.random.number(100),
    //   resource: _randomListItem(resources),
    //   resourceId: faker.random.number(100),
    //   permission: _randomListItem(permissions),
    // }

    it('expect Authorization.role to throw error on null value', (done) => {

      const fakeAuthorizationData = {
        role: null,
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization role cannot be null.');
      })
      .then(done, done);

    });
    it('expect Authorization.role to throw error on empty value', (done) => {
      const fakeAuthorizationData = {
        role: '',
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization role cannot be empty.');
      })
      .then(done, done);
    });
    it('expect Authorization.role to throw error on role not in enum', (done) => {
      const fakeAuthorizationData = {
        role: faker.random.alphaNumeric(24),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain(`DATABASE ERROR: Authorization role must be one of "${Object.values(roles).toString()}".`);
      })
      .then(done, done);
    });



    it('expect Authorization.userId to throw error on null value', (done) => {

      const fakeAuthorizationData = {
        role: _randomListItem(roles),
        userId: null,
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization userId cannot be null.');
      })
      .then(done, done);

    });

    it('expect Authorization.userId to throw error on empty value', (done) => {
      const fakeAuthorizationData = {
        role: _randomListItem(roles),
        userId: '',
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization userId cannot be empty.');
      })
      .then(done, done);
    });

    it('expect Authorization.userId to throw error on non integer', (done) => {
      const fakeAuthorizationData = {
        role: _randomListItem(roles),
        userId: 'non-integer',
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain(`DATABASE ERROR: Authorization userId must be an Integer.`);
      })
      .then(done, done);
    });





    

    it('expect Authorization.resource to throw error on null value', (done) => {
      const fakeAuthorizationData = {
        role:  _randomListItem(roles),
        userId: faker.random.number(100),
        resource: null,
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization resource cannot be null.');
      })
      .then(done, done);
    });

    it('expect Authorization.resource to throw error on empty value', (done) => {
      const fakeAuthorizationData = {
        role:  _randomListItem(roles),
        userId: faker.random.number(100),
        resource: '',
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization resource cannot be empty.');
      })
      .then(done, done);
    });

    it('expect Authorization.resource to throw error on resource not in enum', (done) => {
      const fakeAuthorizationData = {
        role:  _randomListItem(roles),
        userId: faker.random.number(100),
        resource: faker.random.alphaNumeric(14),
        resourceId: faker.random.number(100),
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain(`DATABASE ERROR: Authorization resource must be one of "${Object.values(resources).toString().replace(/\//g, '\\/')}".`);
      })
      .then(done, done);
    });


    it('expect Authorization.resourceId to throw error on null value', (done) => {

      const fakeAuthorizationData = {
        role: _randomListItem(roles),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: null,
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization resourceId cannot be null.');
      })
      .then(done, done);

    });

    it('expect Authorization.resourceId to throw error on empty value', (done) => {
      const fakeAuthorizationData = {
        role: _randomListItem(roles),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: '',
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization resourceId cannot be empty.');
      })
      .then(done, done);
    });

    it('expect Authorization.resourceId to throw error on non integer', (done) => {
      const fakeAuthorizationData = {
        role: _randomListItem(roles),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: 'non-integer',
        permission: _randomListItem(permissions),
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain(`DATABASE ERROR: Authorization resourceId must be an Integer.`);
      })
      .then(done, done);
    });



    it('expect Authorization.permission to throw error on null value', (done) => {
      const fakeAuthorizationData = {
        role:  _randomListItem(roles),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: null,
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization permission cannot be null.');
      })
      .then(done, done);
    });

    it('expect Authorization.permission to throw error on empty value', (done) => {
      const fakeAuthorizationData = {
        role:  _randomListItem(roles),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: '',
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain('DATABASE ERROR: Authorization permission cannot be empty.');
      })
      .then(done, done);
    });

    it('expect Authorization.permission to throw error on resource not in enum', (done) => {
      const fakeAuthorizationData = {
        role:  _randomListItem(roles),
        userId: faker.random.number(100),
        resource: _randomListItem(resources),
        resourceId: faker.random.number(100),
        permission: 'not-an-enum',
      }

      Authorization.create(fakeAuthorizationData)
      .catch((error) => {
        // Set expectations for thrown error
        expect(error).to.have.property('message').to.contain(`DATABASE ERROR: Authorization permission must be one of "${Object.values(permissions).toString()}".`);
      })
      .then(done, done);
    });


  });

  describe('03. Thing Default Value Checks:', () => {});

  describe('04. Thing Prototype Function Checks:', () => {});
});
