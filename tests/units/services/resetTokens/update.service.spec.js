import { expect } from 'chai';
import { users as usersFactory, resetTokens as resetTokensFactory } from '../../../factories';
import { resetTokens as resetTokensService} from '../../../../src/services'
import truncate from '../../../truncate-database';
import faker from 'faker'
import moment from 'moment'

describe('Unit :: Services :: Reset Tokens :: Update', () => {
  // User and Test instance to reference in testing
  let userTestInstance;
  let resetTokenTestInstance;

  beforeEach(async () => {
    // Destroy thing table
    await truncate();

    // Create and assign new user and reset token test instance
    userTestInstance = await usersFactory();
    resetTokenTestInstance = await resetTokensFactory({
      UserId: userTestInstance.id,
    });
  });

  it('expect updateByPk to return updated reset token instance', async () => {
    // Primary key ID to update
    const id = resetTokenTestInstance.id;

    // Fake data to update to
    const updateData = {
      isUsed: faker.random.boolean(),
    };

    // Update reset token with id to data
    const updatedToken = await resetTokensService.updateOneByPk(id, updateData);

    // Get the time 24 hours from now
    const now = new Date();
    const expireDateTime = moment(now).add(24, 'hours');
    const plusTwentyFour = expireDateTime.toDate();

    // Set expectations
    expect(updatedToken).to.have.property('id').to.equal(resetTokenTestInstance.id);
    expect(updatedToken).to.have.property('UserId').to.equal(resetTokenTestInstance.UserId);
    expect(updatedToken).to.have.property('expiration').to.be.closeToTime(plusTwentyFour, 3);
    expect(updatedToken).to.have.property('isUsed').to.equal(updateData.isUsed);
  });

  it('expect updateByPk to throw error on no primary key id', (done) => {
    const id = '';

    // Fake data to update to
    const data = {
      isUsed: faker.random.boolean(),
    };

    resetTokensService
      .updateOneByPk(id, data)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Insufficient parameters in reset token update request.`);
        expect(err).to.have.property('statusCode').to.equal(401);
      })
      .then(done, done);
  });

  it('expect updateByPk to throw error on no update data', (done) => {
    // Primary key id to update
    const id = resetTokenTestInstance.id;

    resetTokensService
      .updateOneByPk(id)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Insufficient parameters in reset token update request.`);
        expect(err).to.have.property('statusCode').to.equal(401);
      })
      .then(done, done);
  });

  it('expect updateByPk to throw error if primary key id not found', (done) => {
    const id = 1;

    // Fake data to update to
    const data = {
      isUsed: faker.random.boolean(),
    };

    resetTokensService
      .updateOneByPk(id, data)
      .catch((err) => {
        expect(err).to.have.property('message').to.equal(`SERVICE ERROR: Reset token ${id} was not found to update.`);
        expect(err).to.have.property('statusCode').to.equal(401);
      })
      .then(done, done);
  });
});
