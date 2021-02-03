import chai from 'chai';
import chaiDateTime from 'chai-datetime';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Confirm Email Token :: Prototype', () => {
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

  describe('04. ConfirmEmailToken Prototype Function checks:', () => {});
});
