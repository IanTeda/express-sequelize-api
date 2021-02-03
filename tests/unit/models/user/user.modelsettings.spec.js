import chai, { expect } from 'chai';
import chaiDateTime from 'chai-datetime';
import faker from 'faker';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig } from '../../../../src/configs';
import { User } from '../../../../src/database';
import { users as usersFactory } from '../../../factories';
import truncate from '../../../truncate-database';

chai.use(chaiDateTime);

describe('Unit :: Database :: Models :: User', () => {
  // Test instance to reference in testing
  let userTestInstance;

  beforeEach('truncate all database and build seed database', async () => {
    // Destroy database tables
    await truncate();

    // Create and assign test instances
    userTestInstance = await usersFactory();
  });

  describe('Get User Settings', () => {

    it('expect user settings', async () => {
      let id = userTestInstance.id;
      let user = await User.findAll({
        where: {
          id: id
        },
        attributes: [`settings`]
      });
      console.log(user.settings)
    })

  });

});

// https://stackoverflow.com/questions/60705929/insert-and-get-json-data-in-sequelize-and-postgres
