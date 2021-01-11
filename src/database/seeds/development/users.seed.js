/**
 * Export seed data for User table
 *
 * @module seeds/development/user
 */

import faker from 'faker';
import { roles, statuses } from '../../../../src/configs';

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

  // Count the number of statuses
  const count = Object.values(statuses).length;

  // Using floor to round downward to its nearest integer
  let randomArrayNumber = Math.floor(percentage * count);

  // Set the user status from dice roll
  const randomUserStatus = Object.values(statuses)[randomArrayNumber];

  return randomUserStatus;
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

  // Count the number of roles
  const count = Object.values(roles).length;

  // Using floor to round downward to its nearest integer
  let randomArrayNumber = Math.floor(percentage * count);

  // Set the user role from the dice roll
  const randomUserRole = Object.values(roles)[randomArrayNumber];

  return randomUserRole;
};

// Defined user roles for testing
const definedRoles = [
  { firstName: 'User', lastName: 'User', email: 'user@teda.id.au', password: 'password123', status: statuses.ACTIVE, role: roles.USER, isEmailConfirmed: true },
  { firstName: 'Admin', lastName: 'User', email: 'admin@teda.id.au', password: 'password123', status: statuses.ACTIVE, role: roles.ADMIN, isEmailConfirmed: true },
  { firstName: 'Sudo', lastName: 'User', email: 'sudo@teda.id.au', password: 'password123', status: statuses.ACTIVE, role: roles.SUDO, isEmailConfirmed: true },
];

// Generate some random users for testing
const randomUsers = [...Array(userDiceRoll)].map((user) => ({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  status: _pickRandomUserStatus(),
  role: _pickRandomUserRole(),
  isEmailConfirmed: faker.random.boolean(),
}));

// Add random roles to defined roles
const users = definedRoles.concat(randomUsers);

export default users;
