import { expect } from 'chai';
import { users as usersFactory, resetTokens as resetTokensFactory } from '../../../factories';
import { resetTokens as resetTokensService } from '../../../../src/services';
import truncate from '../../../truncate-database';
import moment from 'moment';
import faker from 'faker';

describe('Unit :: Services :: Reset Tokens :: Validate', () => {
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
      isUsed: false
    });
  });

  it('expect validateToken to return TRUE if valid', async () => {
    const UserId = resetTokenTestInstance.UserId;
    const token = resetTokenTestInstance.token;

    const isValid = await resetTokensService.validateToken(UserId, token);

    expect(isValid).to.be.true;
  });

  it('expect validateToken to return FALSE if wrong token used', async () => {
    const UserId = resetTokenTestInstance.UserId;
    const token = faker.random.alphaNumeric(32);

    const isValid = await resetTokensService.validateToken(UserId, token);

    expect(isValid).to.be.false;
  });

  it('expect validateToken to return FALSE if wrong email used', async () => {
    const UserId = 1;
    const token = resetTokenTestInstance.token;

    const isValid = await resetTokensService.validateToken(UserId, token);

    expect(isValid).to.be.false;
  });

  it('expect validateToken to return FALSE if token used', async () => {
    const UserId = resetTokenTestInstance.UserId;
    const token = resetTokenTestInstance.token;

    resetTokenTestInstance.isUsed = true;
    await resetTokenTestInstance.save();

    const isValid = await resetTokensService.validateToken(UserId, token);

    expect(isValid).to.be.false;
  });

  it('expect validateToken to return FALSE if expiration date/time is past', async () => {
    const UserId = resetTokenTestInstance.UserId;
    const token = resetTokenTestInstance.token;

    resetTokenTestInstance.expiration = moment().subtract(2, 'minutes').format();
    await resetTokenTestInstance.save();

    const isValid = await resetTokensService.validateToken(UserId, token);

    expect(isValid).to.be.false;
  });
});
