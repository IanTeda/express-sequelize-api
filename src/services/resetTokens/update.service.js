import { ResetToken } from '../../database';

/**
 * Find and update reset token record
 *
 * @memberof module:services/resetTokens
 * @param {Number} id Primary key to find.
 * @param {Object} resetTokenData JSON object of data to update.
 * @param {Boolean} [resetTokenData.isUsed] Has the token been used.
 * @returns {Object} JSON token object.
 * @throws Will throw an error if now primary key id or token data is passed in.
 * @throws Will throw an error if no resetToken is created
 * @example
 * import { resetTokens as resetTokensService } from '/src/services';
 * const id = 1;
 * const data = { isUsed: false }
 * const createdResetToken = await resetTokensService.updateOneByPk(id,data);
 */
const updateOneByPk = async (id, resetTokenData) => {
  try {
    // Check we have the required paramter
    if (!id || !resetTokenData) {
      const error = new Error('SERVICE ERROR: Insufficient parameters in reset token update request.');
      error.statusCode = 401;
      throw error;
    }

    // Find user to be updated
    const foundResetToken = await ResetToken.findOne({
      where: {
        id: id,
      },
    });

    // Check we have a reset token record
    if (!foundResetToken) {
      const error = new Error(`SERVICE ERROR: Reset token ${id} was not found to update.`);
      error.statusCode = 401;
      throw error;
    }

    // Update reset token information only if we have a value
    // False will not get in, so we need a deep equals
    if (resetTokenData.isUsed || resetTokenData.isUsed === false) {
      foundResetToken.isUsed = resetTokenData.isUsed;
    }

    // Save reset token instance to the database
    await foundResetToken.save();

    // Return the saved instance
    return foundResetToken;
  } catch (error) {
    throw error;
  }
};

/**
 * Set all token records for a given UserId as used.
 *
 * @memberof module:services/resetTokens
 * @param {String} UserId - UserId to set all token records as isUsed TRUE
 * @returns {Boolean} Return TRUE if updated or error
 * @throws Will throw an error if no UserId is passed in
 * @example
 * import { resetTokens as resetTokensService } from '/src/services';
 * const UserId = 1;
 * await resetTokensService.updateUsedByUserId(UserId);
 */
const updateUsedByUserId = async (UserId) => {
  try {
    if (!UserId) {
      const error = new Error('SERVICE ERROR: No UserId was provided to update reset tokens used.');
      // TODO think through status code to use in this authentication workflow
      error.statusCode = 401;
      throw error;
    }

    // Update all tokens for given email to isUsed:true
    await ResetToken.update(
      {
        isUsed: true,
      },
      {
        where: {
          UserId: UserId,
        },
      }
    );

    return true;
  } catch (error) {
    throw error;
  }
};

export { updateOneByPk, updateUsedByUserId };
export default { oneByPk: updateOneByPk, usedByUserId: updateUsedByUserId };
