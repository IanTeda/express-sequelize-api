import { Op } from 'sequelize';
import { ResetToken } from '../../database';

/**
 * DESTROY RECORD WITH PRIMARY KEY
 * -------------------------------
 * Destroy reset token with a given primary key ID
 *
 * @param {Number} id Primary key id to destroy.
 * @returns {Number | Error} Number of records destroyed or error.
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
    const count = await ResetToken.destroy({
      where: {
        id: id,
      },
    });

    // Check there is a count to return
    if (!count) {
      const error = new Error(`SERVICE ERROR: Reset token ${id} was not found to destroy.`);
      error.statusCode = 501;
      throw error;
    }

    return count;
  } catch (error) {
    throw error;
  }
};

/**
 * DESTROY EXPIRED TOKENS
 * ----------------------
 * Destroy all tokens that have expired
 *
 * @returns {Number | Error} - Return number of rows destroyed or the error
 */
const destroyExpiredTokens = async () => {
  try {
    // Current date time
    const now = new Date();

    // Count the number of expired tokens destroyed where expiration date is less than now
    const count = await ResetToken.destroy({
      where: {
        expiration: {
          [Op.lt]: now,
        },
      },
    });

    // Check there is a count to return
    if (!count) {
      const error = new Error(`SERVICE ERROR: Could not count expired reset tokens that where destroyed.`);
      error.statusCode = 501;
      throw error;
    }

    return count;
  } catch (error) {
    throw error;
  }
};

export { destroyOneByPk, destroyExpiredTokens };
export default { oneByPk: destroyOneByPk, expiredTokens: destroyExpiredTokens };
