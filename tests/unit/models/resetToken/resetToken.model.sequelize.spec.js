import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import moment from 'moment';
import { ResetToken } from '../../../../src/database';
import { resetTokens as resetTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: Reset Token :: Sequelize', () => {
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

  describe('ResetToken Sequelize Function Checks:', () => {
    it('expect ResetToken.create to return a created reset token with created values', async () => {
      // Reset token data
      const fakeResetTokenData = {
        UserId: userTestInstance.id,
        isUsed: faker.random.boolean(),
      };

      // Created token instance
      const createdResetToken = await ResetToken.create(fakeResetTokenData);

      // 24 Hours from now
      const now = new Date();
      const expireDateTime = moment(now).add(24, 'hours');
      const plusTwentyFour = expireDateTime.toDate();

      // Setting expectations
      expect(createdResetToken).to.have.property('id');
      expect(createdResetToken).to.have.property('UserId').to.be.equal(userTestInstance.id);
      expect(createdResetToken).to.have.property('isUsed').to.be.equal(fakeResetTokenData.isUsed);
      expect(createdResetToken).to.have.property('token');
      expect(createdResetToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 3);
    });

    it('expect ResetToken.findAll to return an array of all reset tokens', async () => {
      // Find all ResetTokens
      const resetTokens = await ResetToken.findAll();

      // Get the length of ResetToken array length
      const numberOfResetTokens = resetTokens.length;

      // Set expectations
      expect(resetTokens).to.be.an('Array');
      expect(numberOfResetTokens).to.be.equal(1);
    });

    it('expect ResetToken.findByPk to return found token by primary key', async () => {
      // Primary key id to query database for
      const id = resetTokenTestInstance.id;

      // Query database
      const resetToken = await ResetToken.findByPk(id);

      // Set expectations
      expect(resetToken).to.have.property('id').to.be.equal(resetTokenTestInstance.id);
      expect(resetToken).to.have.property('UserId').to.be.equal(resetTokenTestInstance.UserId);
      expect(resetToken).to.have.property('isUsed').to.be.equal(resetTokenTestInstance.isUsed);
      expect(resetToken).to.have.property('token').to.be.equal(resetTokenTestInstance.token);
      expect(resetToken).to.have.property('expiration').to.be.equalTime(resetTokenTestInstance.expiration);
    });

    it('expect ResetToken.findOne by UserId to return a reset token for given user id', async () => {
      // What email are we going to look for
      const id = userTestInstance.id;

      // Find reset token
      const resetToken = await ResetToken.findOne({
        where: {
          UserId: id,
        },
      });

      // Set expectations
      expect(resetToken).to.have.property('id').to.be.equal(resetTokenTestInstance.id);
      expect(resetToken).to.have.property('UserId').to.be.equal(resetTokenTestInstance.UserId);
      expect(resetToken).to.have.property('isUsed').to.be.equal(resetTokenTestInstance.isUsed);
      expect(resetToken).to.have.property('token').to.be.equal(resetTokenTestInstance.token);
      expect(resetToken).to.have.property('expiration').to.be.equalTime(resetTokenTestInstance.expiration);
    });

    it('expect ResetToken.findOrCreate to return reset token and created false when reset token found', async () => {
      // Id to find in the database
      const id = resetTokenTestInstance.id;

      // Find or create
      const [resetToken, created] = await ResetToken.findOrCreate({
        where: {
          id: id,
        },
      });

      // Set expectations
      expect(resetToken).to.have.property('id').to.be.equal(resetTokenTestInstance.id);
      expect(resetToken).to.have.property('UserId').to.be.equal(resetTokenTestInstance.UserId);
      expect(resetToken).to.have.property('isUsed').to.be.equal(resetTokenTestInstance.isUsed);
      expect(resetToken).to.have.property('token').to.be.equal(resetTokenTestInstance.token);
      expect(resetToken).to.have.property('expiration').to.be.equalTime(resetTokenTestInstance.expiration);
      expect(created).to.be.false;
    });

    it('expect ResetToken.findOrCreate to return created reset token and created true when ID can not be found', async () => {
      // Id to find in the database
      const id = 1;

      // Reset token data
      const fakeResetTokenData = {
        UserId: userTestInstance.id,
        isUsed: faker.random.boolean(),
      };

      // Find or create
      const [resetToken, created] = await ResetToken.findOrCreate({
        where: {
          id: id,
        },
        defaults: fakeResetTokenData,
      });

      // 24 Hours from now
      const now = new Date();
      const expireDateTime = moment(now).add(24, 'hours');
      const plusTwentyFourHours = expireDateTime.toDate();

      // Set expectations
      expect(resetToken).to.have.property('id');
      expect(resetToken).to.have.property('UserId').to.be.equal(fakeResetTokenData.UserId);
      expect(resetToken).to.have.property('isUsed').to.be.equal(fakeResetTokenData.isUsed);
      expect(resetToken).to.have.property('token');
      expect(resetToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFourHours, 3);
      expect(created).to.be.true;
    });

    it('expect ResetToken.findAndCountAll to return count and rows of reset tokens', async () => {
      // Find all ResetTokens
      const { count: numberOfResetTokens, rows: resetTokens } = await ResetToken.findAndCountAll();

      // Set expectations
      expect(resetTokens).to.be.an('Array');
      expect(numberOfResetTokens).to.be.equal(1);
    });

    it('expect ResetToken.destroy to return number of reset tokens deleted', async () => {
      // Token to destroy
      const token = resetTokenTestInstance.token;

      // Destroy a given tokens
      const count = await ResetToken.destroy({
        where: {
          token: token,
        },
      });

      // Set expectations
      expect(count).to.be.equal(1);
    });

    it('expect ResetToken.count to return the number of found reset tokens', async () => {
      // Token to destroy
      const token = resetTokenTestInstance.token;

      // Count the number of tokens
      const count = await ResetToken.count({
        where: {
          token: token,
        },
      });

      // Set expectations
      expect(count).to.be.equal(1);
    });
  });
});
