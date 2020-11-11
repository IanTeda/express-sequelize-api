import { expect } from 'chai';
import moment from 'moment';
import { confirmEmailTokens as confirmEmailTokensService } from '../../../../src/services';
import { confirmEmailTokens as confirmEmailTokensFactory, users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

describe('Unit :: Services :: Confirm Email Token :: Update', () => {
  // User and Test instance to reference in testing
  let userTestInstance;
  let userTestInstance2;
  let confirmEmailTokenInstance;

  beforeEach('truncate DB tables and generate test instances', async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new user and reset token test instance
    userTestInstance = await usersFactory();
    userTestInstance2 = await usersFactory();
    confirmEmailTokenInstance = await confirmEmailTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  it('expect updateByPk to return updated reset token instance', async () => {
    // Primary key ID to update
    const id = confirmEmailTokenInstance.id;

    const userTestInstance2 = await usersFactory();

    // Fake data to update to
    const updateData = {
      UserId: userTestInstance2.id,
    };

    // Update reset token with id to data
    const updatedToken = await confirmEmailTokensService.updateOneByPk(id, updateData);

    // Get the time 24 hours from now
    const now = new Date();
    const expireDateTime = moment(now).add(24, 'hours');
    const plusTwentyFour = expireDateTime.toDate();

    // Set expectations
    expect(updatedToken).to.have.property('id').to.equal(confirmEmailTokenInstance.id);
    expect(updatedToken).to.have.property('UserId').to.equal(userTestInstance2.id);
    expect(updatedToken).to.have.property('token').to.be.equal(confirmEmailTokenInstance.token);
    expect(updatedToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 3);
  });

  it('expect updateByPk to throw error on no primary key id', (done) => {
    const id = '';

    // Fake data to update to
    const updateData = {
      UserId: userTestInstance2.id,
    };

    confirmEmailTokensService
      .updateOneByPk(id, updateData)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Insufficient parameters in confirm email token update request.`);
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });

  it('expect updateByPk to throw error on no update data', (done) => {
    // Primary key id to update
    const id = confirmEmailTokenInstance.id;

    confirmEmailTokensService
      .updateOneByPk(id)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Insufficient parameters in confirm email token update request.`);
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });

  it('expect updateByPk to throw error if primary key id not found', (done) => {
    const id = 1;

    // Fake data to update to
    const updateData = {
      UserId: userTestInstance2.id,
    };

    confirmEmailTokensService
      .updateOneByPk(id, updateData)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Confirm email token ${id} was not found to update.`);
        expect(err).to.have.property('statusCode').to.equal(500);
      })
      .then(done, done);
  });
});
