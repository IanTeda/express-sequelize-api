import chai, { assert, expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import moment from 'moment';
import { ResetToken } from '../../../src/database';
import { resetToken as resetTokenFactory } from '../../factories';
import truncate from '../../truncate-database';

chai.use(chaiDateTime);

describe('ResetToken Model:', () => {
  // Thing instance to reference in testing
  let testInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new thing
    testInstance = await resetTokenFactory();
  });

  describe('Testing Checks:', () => {
    it('assert factory generates a ResetToken with ID', async () => {
      assert.isOk(testInstance.id);
    });

    it('assert truncate of ResetToken table with each test', async () => {
      const count = await ResetToken.count();
      assert.equal(count, 1);
    });
  });

  describe('Sequelize Functions:', () => {
    it('expect create to return a created ResetToken', async () => {
      const fakeData = {
        email: faker.internet.email(),
        isUsed: faker.random.boolean(),
      };

      const created = await ResetToken.create(fakeData);

      // 24 Hours from now
      const now = new Date();
      const expireDateTime = moment(now).add(24, 'hours');
      const plusTwentyFour = expireDateTime.toDate();

      expect(created).to.have.property('id');
      expect(created).to.have.property('email').to.be.equal(fakeData.email);
      expect(created).to.have.property('isUsed').to.be.equal(fakeData.isUsed);

      // Model generated values
      expect(created).to.have.property('token');
      expect(created).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 3);
    });

    it('expect create to default to isUsed FALSE when creating ResetToken without isUsed value', async () => {
      const fakeData = {
        email: faker.internet.email(),
      };

      // Created instance
      const created = await ResetToken.create(fakeData);

      // 24 Hours from now
      const now = new Date();
      const expireDateTime = moment(now).add(24, 'hours');
      const plusTwentyFour = expireDateTime.toDate();

      expect(created).to.have.property('id');
      expect(created).to.have.property('email').to.be.equal(fakeData.email);

      // Model generated values
      expect(created).to.have.property('isUsed').to.be.false;
      expect(created).to.have.property('token');
      expect(created).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 3);
    });

    it('expect findAll to return an array of all ResetTokens', async () => {
      const tokens = await ResetToken.findAll();

      expect(tokens).to.be.an('Array');
    });

    it('expect findOne to return a ResetToken with given email', async () => {
      const email = testInstance.email;

      const resetToken = await ResetToken.findOne({
        where: {
          email: email,
        },
      });

      expect(resetToken).to.have.property('id').to.be.equal(testInstance.id);
      expect(resetToken).to.have.property('email').to.be.equal(testInstance.email);
      expect(resetToken).to.have.property('isUsed').to.be.equal(testInstance.isUsed);
      expect(resetToken).to.have.property('token').to.be.equal(testInstance.token);
      expect(resetToken).to.have.property('expiration').to.be.equalTime(testInstance.expiration);
    });
  });

  describe('Model Prototype Functions:', () => {
    
  });
});
