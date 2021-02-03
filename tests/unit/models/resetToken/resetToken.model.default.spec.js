import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import moment from 'moment';
import { ResetToken, User } from '../../../../src/database';
import { resetTokens as resetTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Reset Token :: Default', () => {
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

  describe('ResetToken Default Value Checks:', () => {
    it('expect ResetToken.create to default isUsed to FALSE when no value passed', async () => {
      // Reset token fake data
      const fakeResetTokenData = {
        UserId: userTestInstance.id,
      };

      // Created instance
      const createdResetToken = await ResetToken.create(fakeResetTokenData);

      // Set expectations
      expect(createdResetToken).to.have.property('isUsed').to.be.false;
    });

    it('expect ResetToken.create to default createdResetToken.expiration to plus 24 hours', async () => {
      // Reset token fake data
      const fakeResetTokenData = {
        UserId: userTestInstance.id,
        isUsed: faker.random.boolean(),
      };

      // Created instance
      const createdResetToken = await ResetToken.create(fakeResetTokenData);

      // 24 Hours from now
      const now = new Date();
      const expireDateTime = moment(now).add(24, 'hours');
      const plusTwentyFour = expireDateTime.toDate();

      // Set expectations
      expect(createdResetToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 3);
    });

    it('expect delete of user.id to cascade into ConfirmEmailTokens destroy', async () => {

      // Count all ConfirmEmailToken
      const { count: tokensCount } = await ResetToken.findAndCountAll();

      // Destroy user associated with ConfirmEmailToken
      await User.destroy({
        where: {
          id: userTestInstance.id,
        },
      });

      // Count all ConfirmEmailToken after user has been destroyed
      const { count: postUserTokenCount } = await ResetToken.findAndCountAll();

      expect(postUserTokenCount).to.equal(tokensCount - 1);
    });
  });
});
