/**
 * Export seed data for User table
 *
 * @module seeds/development/user
 */

import faker from 'faker';
import {roles, statuses} from '../../../../src/configs'

const userDiceRoll = faker.random.number({
  min: 30,
  max: 100,
});

/**
 * Roll the dice and pick a random status from the array
 *
 * @ignore
 * @return {String} Random user status from status array
 */
const _pickRandomUserStatus = () => {
  // Get a random number between 0 an 1
  let percentage = Math.random();

  // Using floor to round downward to its nearest integer
  let randomArrayNumber = Math.floor(percentage * statuses.length);

  // Set the user status from dice roll
  const userStatus = statuses[randomArrayNumber];

  return userStatus;
};

/**
 * Roll the dice and pick a random user role from array
 *
 * @ignore
 * @return {String} Random user role from role array
 */
const _pickRandomUserRole = () => {
  // Get a random number between 0 an 1
  let percentage = Math.random();

  // Using floor to round downward to its nearest integer
  let randomArrayNumber = Math.floor(percentage * statuses.length);

  // Set the user role from the dice roll
  const userRole = roles[randomArrayNumber];

  return userRole;
};

const users = [...Array(userDiceRoll)].map((user) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  status: _pickRandomUserStatus(),
  role: _pickRandomUserRole(),
  isEmailConfirmed: faker.random.boolean(),
}));

const sudoUser = {
  firstName: 'Ian',
  lastName: 'Teda',
  email: 'ian@teda.id.au',
  password: 'password123',
  status: 'active',
  role: 'sudo',
  isEmailConfirmed: true,
};

// Add sudo user to user array
users.unshift(sudoUser);

export default users;
