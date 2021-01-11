import { ConfirmEmailToken } from '../../database';
import { statusCodes } from '../../configs'

/**
 * Generate a new token for confirming an new users email address.
 *
 * @memberof module:services/confirmEmailToken
 * @param {String} UserId - User ID foreign key to associate with token.
 * @returns {Object} - ConfirmEmailToken object or thrown error.
 * @throws - Will throw an error if a UserId is not passed in.
 * @throws - Will throw an error if a created ConfirmEmailToken instance is not created.
 * @example
 * import { confirmEmailToken as confirmEmailTokenService } from '/src/services';
 * const UserId = 1;
 * const createdToken = await confirmEmailTokenService.createOne(UserId);
 */
const createOne = async (UserId) => {
  try {
    // Check that a UserId has been passed in
    if (!UserId) {
      const error = new Error('SERVICE ERROR: No user id was provided to generate email confirmation token.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Data used to create token
    // Everything else is set by database model defaults
    const tokenData = {
      UserId: UserId,
    };

    // Created token instance
    const createdToken = await ConfirmEmailToken.create(tokenData);

    // Check we have a created reset token instance to return
    if (!createdToken) {
      const error = new Error('SERVICE ERROR: Failed to create email confirmation token.');
      error.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // Return created reset token instance
    return createdToken;
  } catch (error) {
    throw error;
  }
};

export { createOne };
export default { one: createOne };
