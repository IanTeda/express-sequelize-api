import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import { ConfirmEmailToken } from '../../../../src/database';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Confirm Email Token :: Validation', () => {
  // Test instance to reference in testing
  let userTestInstance;
  let confirmEmailTokenInstance;

  beforeEach('create User and ConfirmEmailToken test instances', async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    userTestInstance = await usersFactory();
    confirmEmailTokenInstance = await confirmEmailTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  describe('02. ConfirmEmailToken Validation Checks:', () => {
    it('expect ResetToken.create to throw an error on null userId', (done) => {
      const fakeTokenData = {
        UserId: null,
      };

      ConfirmEmailToken.create(fakeTokenData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contains('notNull Violation: DATABASE ERROR: ConfirmEmailToken UserId cannot be null.');
        })
        .then(done, done);
    });

    it('expect ResetToken.create to throw an error on empty userId', (done) => {
      const fakeTokenData = {
        UserId: '',
      };

      ConfirmEmailToken.create(fakeTokenData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contains('Validation error: DATABASE ERROR: ConfirmEmailToken UserId cannot be empty.');
        })
        .then(done, done);
    });

    it('expect ResetToken.create to throw an error on non-foreign key id', (done) => {
      const fakeTokenData = {
        UserId: 1,
      };

      ConfirmEmailToken.create(fakeTokenData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contain('insert or update on table "ConfirmEmailTokens" violates foreign key constraint "ConfirmEmailTokens_UserId_fkey"');
        })
        .then(done, done);
    });
  });
});
