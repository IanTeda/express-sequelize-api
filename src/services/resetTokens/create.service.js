import { ResetToken } from '../../database';

/**
 * CREATE RESET TOKEN
 * -------------------
 * Generate a new reset token for a given UserId
 *
 * @param {String} UserId - User ID foreign key to associate with reset token.
 * @returns {Object | Error} - Reset token object or thrown error.
 */
const createOne = async (UserId) => {
  try {
    // Check that a UserId has been passed in
    if (!UserId) {
      const error = new Error('SERVICE ERROR: No user id was provided to generate reset token.');
      error.statusCode = 501;
      throw error;
    }

    // Data used to create token
    // Everything else is set by database model defaults
    const resetTokenData = {
      UserId: UserId,
      isUsed: false
    };

    // Created token instance
    const createdResetToken = await ResetToken.create(resetTokenData);

    // Check we have a created reset token instance to return
    if (!createdResetToken) {
      const error = new Error('SERVICE ERROR: Create reset token returned no record.');
      error.statusCode = 401;
      throw error;
    }

    // Return created reset token instance
    return createdResetToken;
  } catch (error) {
    throw error;
  }
};

export { createOne };
export default { one: createOne}
