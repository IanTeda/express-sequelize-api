import { Op } from 'sequelize';
import { ConfirmEmailToken } from '../../database';

/**
 * Destroy email confirmation token for a given primary key ID
 *
 * @memberof module:services/confirmEmailTokens
 * @param {Number} id - Primary key id of token to destroy.
 * @returns {Number} - Number of records destroyed or error.
 * @throws - Will throw an error if no primary key id is passed in.
 * @throws - Will throw an error if no destroyedCount is created.
 * @example
 * import { confirmEmailToken as confirmEmailTokenService } from '/src/services';
 * const id = 1;
 * const destroyedCount = await confirmEmailTokenService.destroyOneByPk(id);
 */
const destroyOneByPk = async (id) => {
  try {
    // Check a primary key id has been passed in
    if (!id) {
      const error = new Error('SERVICE ERROR: No id provided to destroy email confirmation token.');
      error.statusCode = 501;
      throw error;
    }

    // Count the number of reset tokens destroyed with id
    const destroyedCount = await ConfirmEmailToken.destroy({
      where: {
        id: id,
      },
    });

    // Check there is a count to return
    if (!destroyedCount) {
      const error = new Error(`SERVICE ERROR: Confirm email token ${id} was not found to destroy.`);
      error.statusCode = 501;
      throw error;
    }

    return destroyedCount;
  } catch (error) {
    throw error;
  }
};

/**
 * Destroy all tokens that have expired past now.
 *
 * @memberof module:services/confirmEmailTokens
 * @returns - Return the number of database rows destroyed.
 * @throws Will throw an error if destroyedCount is not created
 * @example
 * import { confirmEmailToken as confirmEmailTokenService } from '/src/services';
 * const destroyedCount = await confirmEmailTokenService.destroyExpiredTokens();
 */
const destroyExpiredTokens = async () => {
  try {
    // Current date time
    const now = new Date();

    // Count the number of expired tokens destroyed where expiration date is less than now
    const destroyedCount = await ConfirmEmailToken.destroy({
      where: {
        expiration: {
          [Op.lt]: now,
        },
      },
    });

    // Check there is a count to return
    if (!destroyedCount) {
      const error = new Error(`SERVICE ERROR: Could not count expired email confirmation tokens that where destroyed.`);
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
