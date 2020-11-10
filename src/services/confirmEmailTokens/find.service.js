import { ConfirmEmailToken } from '../../database';

/**
 * Find and return all email confirmation tokens in the database table
 * based on offset, limit and where.
 *
 * @memberof module:services/confirmEmailTokens
 * @param {Number} [offset] - Number of pages to offset query, based on limit.
 * @param {Number} [limit] - Limit the number of rows the query returns.
 * @param {String} [where] - Filter records where.
 * @returns - Returns a JSON array of found tokens.
 * @throws - Will throw an error if foundResetTokens is not created.
 * @example
 * import { confirmEmailToken as confirmEmailTokenService } from '/src/services';
 * const foundTokens = await confirmEmailTokenService.findAll();
 */
const findAll = async (offset, limit, where) => {
  try {

    // Find reset tokens at a given offset and within a limit where equal to
    const foundTokens = await ConfirmEmailToken.findAll({
      limit: limit,
      offset: offset,
      where: where,
    });

    // Check we have reset tokens to return
    if (!foundTokens) {
      const error = new Error(`SERVICE ERROR: Unable to find email confirmation tokens.`);
      error.statusCode = 501;
      throw error;
    }

    return foundTokens;
  } catch (error) {
    return error;
  }
};

/**
 * Find a reset token with a given primary key (ID)
 *
 * @memberof module:services/confirmEmailTokens
 * @param {Number} id - The primary key for token row.
 * @returns - Will return the found token record.
 * @throws - Will throw an error if no primary key id passed in.
 * @throws - Will throw an error if no foundToken is created.
 * @example
 * import { confirmEmailToken as confirmEmailTokenService } from '/src/services';
 * const id = 1;
 * const foundToken = await confirmEmailTokenService.findOneByPk(id);
 */
const findOneByPk = async (id) => {
  try {
    // Check there is a primary key id to find
    if (!id) {
      const error = new Error('SERVICE ERROR: Primary key was not provided in the confirm email token find request.');
      error.statusCode = 501;
      throw error;
    }

    // Find reset token instance
    const foundToken = await ConfirmEmailToken.findOne({
      where: { id: id },
    });

    // Check we have a reset token instance to return
    if (!foundToken) {
      const error = new Error(`SERVICE ERROR: Confirm email token with id ${id} was not found.`);
      error.statusCode = 501;
      throw error;
    }

    return foundToken;
  } catch (error) {
    throw error;
  }
};

/**
 * Find a token record with a given token value
 *
 * @memberof module:services/confirmEmailTokens
 * @param {String} token - Token string to search table.
 * @returns - Will return a JSON array of first found record.
 * @throws - Will throw an error if no token string is passed in.
 * @throws - Will throw an error if no foundToken is created.
 * @example
 * import { confirmEmailToken as confirmEmailTokenService } from '/src/services';
 * const token = kljkDSOIJndkfo98u34nlkndio8dfknkjdf09ujkl;
 * const foundToken = await confirmEmailTokenService.findOneByPk(token);
 */
const findOneByToken = async (token) => {
  try {
    // Check a reset token value has been passed in
    if (!token) {
      const error = new Error('SERVICE ERROR: No token was provided in confirm email token find request.');
      error.statusCode = 501;
      throw error;
    }

    // Find a given reset token instance
    const foundToken = await ConfirmEmailToken.findOne({
      where: { token: token },
    });

    // Check we have reset token instance to return
    if (!foundToken) {
      const error = new Error(`SERVICE ERROR: Confirm email token ${token} could not be found.`);
      error.statusCode = 501;
      throw error;
    }

    return foundToken;
  } catch (error) {
    throw error;
  }
};

export { findAll, findOneByPk, findOneByToken };

export default { all: findAll, oneByPk: findOneByPk, oneByToken: findOneByToken };
