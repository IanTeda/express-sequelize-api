import chai from 'chai';
import chaiDateTime from 'chai-datetime';
import { resetTokens as resetTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Reset Token :: Prototype', () => {
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

  describe('ResetToken Prototype Checks:', () => {});
});
