import { ResetToken } from '../../database';

/**
 * Generate a new reset token for a given UserId
 *
 * @memberof module:services/resetTokens
 * @param {String} UserId - User ID foreign key to associate with reset token.
 * @returns {Object} - Reset token object or thrown error.
 * @throws Will throw an error if a UserId is not passed in.
 * @throws Will throw an error if a created ResetToken instance is not created.
 * @example
 * import { resetTokens as resetTokensService } from '/src/services';
 * const UserId = 1;
 * const createdResetToken = await resetTokensService.createOne(UserId);
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
export default { one: createOne };
