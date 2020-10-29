import { Op } from 'sequelize';
import { ResetToken } from '../../database';

/**
 * Destroy reset token with a given primary key ID
 *
 * @memberof module:services/resetTokens
 * @param {Number} id Primary key id to destroy.
 * @returns {Number} Number of records destroyed or error.
 * @throws Will throw an error if no primary key id is passed in.
 * @throws Will throw an error if no destroyedCount is created.
 * @example
 * import { resetTokens as resetTokensService } from '/src/services';
 * const id = 1;
 * const destroyedCount = await resetTokensService.destroyOneByPk(id);
 */
const destroyOneByPk = async (id) => {
  try {
    // Check a primary key id has been passed in
    if (!id) {
      const error = new Error('SERVICE ERROR: No id provided in reset token destroy request');
      error.statusCode = 501;
      throw error;
    }

    // Count the number of reset tokens destroyed with id
    const destroyedResetTokensCount = await ResetToken.destroy({
      where: {
        id: id,
      },
    });

    // Check there is a count to return
    if (!destroyedResetTokensCount) {
      const error = new Error(`SERVICE ERROR: Reset token ${id} was not found to destroy.`);
      error.statusCode = 501;
      throw error;
    }

    return destroyedResetTokensCount;
  } catch (error) {
    throw error;
  }
};

/**
 * Destroy all tokens that have expired past now.
 *
 * @memberof module:services/resetTokens
 * @returns {Number} - Return number of rows destroyed
 * @throws Will throw an error if destroyedCount is not created
 * @example
 * import { resetTokens as resetTokensService } from '/src/services';
 * const destroyedCount = await resetTokensService.destroyExpiredTokens();
 */
const destroyExpiredTokens = async () => {
  try {
    // Current date time
    const now = new Date();

    // Count the number of expired tokens destroyed where expiration date is less than now
    const destroyedCount = await ResetToken.destroy({
      where: {
        expiration: {
          [Op.lt]: now,
        },
      },
    });

    // Check there is a count to return
    if (!destroyedCount) {
      const error = new Error(`SERVICE ERROR: Could not count expired reset tokens that where destroyed.`);
      error.statusCode = 501;
      throw error;
    }

    return destroyedCount;
  } catch (error) {
    throw error;
  }
};

export { destroyOneByPk, destroyExpiredTokens };
export default { oneByPk: destroyOneByPk, expiredTokens: destroyExpiredTokens };
