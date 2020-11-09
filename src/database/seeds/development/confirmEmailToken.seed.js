import faker from 'faker';

/**
 * Roll the dice and return random user
 * 
 * @ignore
 * @param {Array} users JSON array of users
 * @return {String} Random user id
 */
const _pickRandomUserId = (users) => {
  // Get a random number between 0 an 1 and multiple by the length of the array
  let percentage = Math.random();

  // Using floor to round downward to its nearest integer
  let randomArrayNumber = Math.floor(percentage * users.length);

  // Random user in array
  let randomUser = users[randomArrayNumber];

  // User id number
  const id = randomUser.id;

  // Return id
  return id;
};

/**
 * Randomly generate reset token seed data
 *
 * @ignore
 * @param {Array} users JSON array of user data to get primary key id's from
 * @return {Array} JSON array of reset token seed data
 */
const getConfirmEmailTokenSeed = (users) => {
  try {
    // Check we have users to get an id from
    if (!users) throw new Error(`RESET TOKEN SEED ERROR: No users data provided.`);

    // Randomly pick the seed size
    const confirmEmailSeedSize = faker.random.number({
      min: 30,
      max: 100,
    });

    // Reset token array
    let confirmEmailTokens = [];

    // Loop through reset token seed size
    for (let token = 1; token <= confirmEmailSeedSize; token++) {
      // Randomly pick user id
      let UserId = _pickRandomUserId(users);

      // Push new reset token to the array
      confirmEmailTokens.push({
        UserId: UserId
      });
    }

    return confirmEmailTokens;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default getConfirmEmailTokenSeed;
