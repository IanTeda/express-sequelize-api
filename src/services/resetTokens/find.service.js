import { ResetToken } from '../../database';

/**
 * Find and return all reset tokens in the database table
 *
 * @memberof module:services/resetTokens
 * @param {Number} [offset] Number of pages to offset based on limit.
 * @param {Number} [limit] Limit the number of rows returned.
 * @param {String} [where] Filter records by.
 * @returns {JSON} Returns a JSON array of found tokens.
 * @throws Will throw an error if foundResetTokens is not created.
 * @example
 * import { resetTokens as resetTokensService } from '/src/services';
 * const foundResetTokens = await resetTokensService.findAll();
 */
const findAll = async (offset, limit, where) => {
  try {

    // Find reset tokens at a given offset and within a limit where equal to
    const foundResetTokens = await ResetToken.findAll({
      limit: limit,
      offset: offset,
      where: where,
    });

    // Check we have reset tokens to return
    if (!foundResetTokens) {
      const error = new Error(`SERVICE ERROR: Unable to find reset tokens.`);
      error.statusCode = 401;
      throw error;
    }

    return foundResetTokens;
  } catch (error) {
    return error;
  }
};

/**
 * Find a reset token with a given primary key (ID)
 *
 * @memberof module:services/resetTokens
 * @param {Number} id The primary key for token row.
 * @returns {JSON} Return found token record.
 * @throws Will throw an error if no primary key id passed in.
 * @throws Will throw an error if no foundResetToken is created.
 * @example
 * import { resetTokens as resetTokensService } from '/src/services';
 * const id = 1;
 * const foundResetToken = await resetTokensService.findOneByPk(id);
 */
const findOneByPk = async (id) => {
  try {
    // Check there is a primary key id to find
    if (!id) {
      const error = new Error('SERVICE ERROR: No id provided in reset token find request.');
      error.statusCode = 401;
      throw error;
    }

    // Find reset token instance
    const foundResetToken = await ResetToken.findOne({
      where: { id: id },
    });

    // Check we have a reset token instance to return
    if (!foundResetToken) {
      const error = new Error(`SERVICE ERROR: Reset token ${id} was not found.`);
      error.statusCode = 401;
      throw error;
    }

    return foundResetToken;
  } catch (error) {
    throw error;
  }
};

/**
 * Find a record with a given reset token value
 *
 * @memberof module:services/resetTokens
 * @param {String} token Token string to search table.
 * @returns {JSON} JSON array of first found record.
 * @throws Will throw an error if no resetToken string is passed in.
 * @throws Will throw an error if no foundResetToken is created.
 * @example
 * import { resetTokens as resetTokensService } from '/src/services';
 * const resetToken = kljkDSOIJndkfo98u34nlkndio8dfknkjdf09ujkl;
 * const foundResetToken = await resetTokensService.findOneByPk(resetToken);
 */
const findOneByToken = async (token) => {
  try {
    // Check a reset token value has been passed in
    if (!token) {
      const error = new Error('SERVICE ERROR: No token value provided in reset token find request.');
      error.statusCode = 401;
      throw error;
    }

    // Find a given reset token instance
    const foundResetToken = await ResetToken.findOne({
      where: { token: token },
    });

    // Check we have reset token instance to return
    if (!foundResetToken) {
      const error = new Error(`SERVICE ERROR: Reset token ${token} was not found.`);
      error.statusCode = 401;
      throw error;
    }

    return foundResetToken;
  } catch (error) {
    throw error;
  }
};

export { findAll, findOneByPk, findOneByToken };

export default { all: findAll, oneByPk: findOneByPk, oneByToken: findOneByToken };
