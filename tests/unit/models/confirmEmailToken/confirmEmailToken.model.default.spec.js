import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import moment from 'moment';
import { ConfirmEmailToken, User } from '../../../../src/database';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Confirm Email Token :: Default', () => {
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

  describe('ConfirmEmailToken Default Value Checks:', async () => {
    it('expect ResetToken.create to default createdResetToken.expiration to plus 24 hours', async () => {
      // Reset token fake data
      const fakeTokenData = {
        UserId: userTestInstance.id,
      };

      // Created instance
      const createdToken = await ConfirmEmailToken.create(fakeTokenData);

      // 24 Hours from now
      const now = new Date();
      const expireDateTime = moment(now).add(24, 'hours');
      const plusTwentyFour = expireDateTime.toDate();

      // Set expectations
      expect(createdToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 3);
    });

    it('expect delete of user.id to cascade into ConfirmEmailTokens destroy', async () => {
      // Count all ConfirmEmailToken
      const { count: tokensCount } = await ConfirmEmailToken.findAndCountAll();

      // Destroy user associated with ConfirmEmailToken
      await User.destroy({
        where: {
          id: userTestInstance.id,
        },
      });

      // Count all ConfirmEmailToken after user has been destroyed
      const { count: postUserTokenCount } = await ConfirmEmailToken.findAndCountAll();

      expect(postUserTokenCount).to.equal(tokensCount - 1);
    });
  });
});
