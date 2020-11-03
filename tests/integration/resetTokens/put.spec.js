import { resetTokens as resetTokensFactory, users as usersFactory } from '../../factories';
import chai, { expect } from 'chai';
import server from '../../../src/app';
import chaiHttp from 'chai-http';
import truncate from '../../truncate-database';

chai.use(chaiHttp);

describe('Integration :: ResetTokens :: PUT', () => {
  // Thing instance to reference in testing
  let resetTokenTestInstance;
  let userTestInstance;

  beforeEach(async () => {
    // Destroy database tables
    await truncate();

    // Create and assign new thing
    userTestInstance = await usersFactory();
    resetTokenTestInstance = await resetTokensFactory({
      UserId: userTestInstance.id,
    });
  });

});
