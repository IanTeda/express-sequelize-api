import { expect } from 'chai';
import faker from 'faker';
import { users as usersService } from '../../../../src/services';
import { users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Users :: Destroy', () => {
  // User instance to reference in testing
  let testUser;

  beforeEach(async () => {
    // Destroy User table
    await truncate();

    // Create and assign new user
    testUser = await usersFactory();
  });

  it('expect destroyByPk to return number of rows deleted', async () => {
    // await is important because a promise is returned by the service
    const rowsDestroyed = await usersService.destroyByPk(testUser.id);

    expect(rowsDestroyed).to.be.at.least(1);
  });

  it('expect destroyByPk to throw an error if ID cannot be found', (done) => {
    const id = 1;

    usersService
      .destroyByPk(id)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: User ${id} was not found to destroy.`);
        expect(err).to.have.property('statusCode').to.equal(501);
      })
      .then(done, done);
  });
});
