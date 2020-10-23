import { expect } from 'chai';
import {users as usersSeed} from '../../../src/database/seeds/development';

describe('Unit :: Database :: Seeds :: Development :: Users', () => {
  it('expect user seed to be an array of users', () => {
    expect(usersSeed).to.be.an('Array');
  });

  it('expect user seed to be an array of at least 31 users', () => {
    expect(usersSeed).to.have.lengthOf.at.least(32);
  });

  it('expect user seed to be an array of at no more than 101 users', () => {
    expect(usersSeed).to.have.lengthOf.below(102);
  });

  it('expect userSeed[0] to be sudo user', () => {
    // Get first user from the user array
    const user = usersSeed[0];

    // Super user
    const sudoUser = {
      firstName: 'Ian',
      lastName: 'Teda',
      email: 'ian@teda.id.au',
      password: 'password123',
      status: 'active',
      role: 'sudo',
      isEmailConfirmed: true,
    };

    // Set expectations for user in array
    expect(user).to.have.property('firstName').to.be.equal(sudoUser.firstName);
    expect(user).to.have.property('lastName').to.be.equal(sudoUser.lastName);
    expect(user).to.have.property('email').to.be.equal(sudoUser.email);
    expect(user).to.have.property('status').to.be.equal(sudoUser.status);
    expect(user).to.have.property('role').to.be.equal(sudoUser.role);
    expect(user).to.have.property('isEmailConfirmed').to.be.equal(sudoUser.isEmailConfirmed);
  });

});
