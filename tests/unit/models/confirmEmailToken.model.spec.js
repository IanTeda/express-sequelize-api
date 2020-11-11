import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import moment from 'moment';
import { ConfirmEmailToken, User } from '../../../src/database';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Confirm Email Token', () => {
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

  describe('01. ConfirmEmailToken Sequelize Function Checks:', () => {
    it('expect ConfirmEmailToken.create to return a created reset token with created values', async () => {
      // Reset token data
      const fakeTokenData = {
        UserId: userTestInstance.id,
      };

      // Created token instance
      const createdToken = await ConfirmEmailToken.create(fakeTokenData);

      // 24 Hours from now
      const now = new Date();
      const expireDateTime = moment(now).add(24, 'hours');
      const plusTwentyFour = expireDateTime.toDate();

      // Setting expectations
      expect(createdToken).to.have.property('id');
      expect(createdToken).to.have.property('UserId').to.be.equal(userTestInstance.id);
      expect(createdToken).to.have.property('token');
      expect(createdToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 3);
    });

    it('expect ConfirmEmailToken.findAll to return an array of all reset tokens', async () => {
      // Find all ResetTokens
      const foundTokens = await ConfirmEmailToken.findAll();

      // Get the length of ResetToken array lengths
      const numberOfTokens = foundTokens.length;

      // Set expectations
      expect(foundTokens).to.be.an('Array');
      expect(numberOfTokens).to.be.equal(1);
    });

    it('expect ConfirmEmailToken.findByPk to return found token by primary key', async () => {
      // Primary key id to query database for
      const id = confirmEmailTokenInstance.id;

      // Query database
      const foundToken = await ConfirmEmailToken.findByPk(id);

      // Set expectations
      expect(foundToken).to.have.property('id').to.be.equal(confirmEmailTokenInstance.id);
      expect(foundToken).to.have.property('UserId').to.be.equal(confirmEmailTokenInstance.UserId);
      expect(foundToken).to.have.property('token').to.be.equal(confirmEmailTokenInstance.token);
      expect(foundToken).to.have.property('expiration').to.be.equalTime(confirmEmailTokenInstance.expiration);
    });

    it('expect ConfirmEmailToken.findOne by UserId to return a token for given user id', async () => {
      // What email are we going to look for
      const id = userTestInstance.id;

      // Find reset token
      const foundToken = await ConfirmEmailToken.findOne({
        where: {
          UserId: id,
        },
      });

      // Set expectations
      expect(foundToken).to.have.property('id').to.be.equal(confirmEmailTokenInstance.id);
      expect(foundToken).to.have.property('UserId').to.be.equal(confirmEmailTokenInstance.UserId);
      expect(foundToken).to.have.property('token').to.be.equal(confirmEmailTokenInstance.token);
      expect(foundToken).to.have.property('expiration').to.be.equalTime(confirmEmailTokenInstance.expiration);
    });

    it('expect ConfirmEmailToken.findOrCreate to return token and created false when token found', async () => {
      // Id to find in the database
      const id = confirmEmailTokenInstance.id;

      // Find or create
      const [foundToken, created] = await ConfirmEmailToken.findOrCreate({
        where: {
          id: id,
        },
      });

      // Set expectations
      expect(foundToken).to.have.property('id').to.be.equal(confirmEmailTokenInstance.id);
      expect(foundToken).to.have.property('UserId').to.be.equal(confirmEmailTokenInstance.UserId);
      expect(foundToken).to.have.property('token').to.be.equal(confirmEmailTokenInstance.token);
      expect(foundToken).to.have.property('expiration').to.be.equalTime(confirmEmailTokenInstance.expiration);
      expect(created).to.be.false;
    });

    it('expect ConfirmEmailToken.findOrCreate to return created token and created true when ID can not be found', async () => {
      // Id to find in the database
      const id = 1;

      // Reset token data
      const fakeTokenData = {
        UserId: userTestInstance.id,
      };

      // Find or create
      const [foundToken, created] = await ConfirmEmailToken.findOrCreate({
        where: {
          id: id,
        },
        defaults: fakeTokenData,
      });

      // 24 Hours from now
      const now = new Date();
      const expireDateTime = moment(now).add(24, 'hours');
      const plusTwentyFourHours = expireDateTime.toDate();

      // Set expectations
      expect(foundToken).to.have.property('id');
      expect(foundToken).to.have.property('UserId').to.be.equal(fakeTokenData.UserId);
      expect(foundToken).to.have.property('token');
      expect(foundToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFourHours, 3);
      expect(created).to.be.true;
    });

    it('expect ResetToken.findAndCountAll to return count and rows of reset tokens', async () => {
      const confirmEmailTokenInstance2 = await confirmEmailTokensFactory({
        UserId: userTestInstance.id,
      });

      // Find all ResetTokens
      const { count: numberOfTokens, rows: foundTokens } = await ConfirmEmailToken.findAndCountAll();

      // Set expectations
      expect(foundTokens).to.be.an('Array');
      expect(numberOfTokens).to.be.equal(2);
    });

    it('expect ResetToken.destroy to return number of reset tokens deleted', async () => {
      // Token to destroy
      const token = confirmEmailTokenInstance.token;

      // Destroy a given tokens
      const count = await ConfirmEmailToken.destroy({
        where: {
          token: token,
        },
      });

      // Set expectations
      expect(count).to.be.equal(1);
    });

    it('expect ResetToken.count to return the number of found reset tokens', async () => {
      // Token to destroy
      const token = confirmEmailTokenInstance.token;

      // Count the number of tokens
      const count = await ConfirmEmailToken.count({
        where: {
          token: token,
        },
      });

      // Set expectations
      expect(count).to.be.equal(1);
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

  describe('03. ConfirmEmailToken Default Value Checks:', async () => {
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

  describe('04. ConfirmEmailToken Prototype Function checks:', () => {});
});
