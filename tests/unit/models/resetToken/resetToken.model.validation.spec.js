import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import { ResetToken } from '../../../../src/database';
import { resetTokens as resetTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Reset Token :: Validation', () => {
  // Test instance to reference in testing
  let resetTokenTestInstance;
  let userTestInstance;

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create a new user test instance
    userTestInstance = await usersFactory();

    // Create and assign test instances
    resetTokenTestInstance = await resetTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  describe('ResetToken Validation Checks:', () => {
    it('expect ResetToken.create to throw an error on null userId', (done) => {
      const fakeResetTokenData = {
        UserId: null,
        isUsed: faker.random.boolean(),
      };

      ResetToken.create(fakeResetTokenData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contains('notNull Violation: DATABASE ERROR: ResetToken UserId cannot be null.');
        })
        .then(done, done);
    });

    it('expect ResetToken.create to throw an error on empty userId', (done) => {
      const fakeResetTokenData = {
        UserId: '',
        isUsed: faker.random.boolean(),
      };

      ResetToken.create(fakeResetTokenData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contains('Validation error: DATABASE ERROR: ResetToken UserId cannot be empty.');
        })
        .then(done, done);
    });

    it('expect ResetToken.create to throw an error on non-foreign key id', (done) => {
      const fakeResetTokenData = {
        UserId: 1,
        isUsed: faker.random.boolean(),
      };

      ResetToken.create(fakeResetTokenData)
        .catch((error) => {
          expect(error).to.have.property('message').to.contain('insert or update on table "ResetTokens" violates foreign key constraint "ResetTokens_UserId_fkey"');
        })
        .then(done, done);
    });
  });
});
