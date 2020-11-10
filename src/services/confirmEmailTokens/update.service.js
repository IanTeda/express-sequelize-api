import { ConfirmEmailToken } from '../../database';

/**
 * Find and update reset token record
 *
 * @memberof module:services/confirmEmailTokens
 * @param {Number} id - Primary key of token to update.
 * @param {Object} updateData - JSON object of token data to update.
 * @param {Integer} [resetTokenData.UserId] - Foreign key for associated user.
 * @param {Date} [resetTokenData.expiration] - Token expiration date.
 * @returns - Will return a SON token object.
 * @throws - Will throw an error if now primary key id or token data is passed in.
 * @throws - Will throw an error if no updatedToken is created
 * @example
 * import { confirmEmailToken as confirmEmailTokenService } from '/src/services';
 * const id = 1;
 * const data = {
 *    UserId: 1,
 *    expiration: 342342
 * }
 * const updatedToken = await confirmEmailTokenService.updateOneByPk(id,data);
 */
const updateOneByPk = async (id, updateData) => {
  try {
    // Check we have the required paramter
    if (!id || !updateData) {
      const error = new Error('SERVICE ERROR: Insufficient parameters in confirm email token update request.');
      error.statusCode = 401;
      throw error;
    }

    // Find user to be updated
    const foundToken = await ConfirmEmailToken.findOne({
      where: {
        id: id,
      },
    });

    // Check we have a reset token record
    if (!foundToken) {
      const error = new Error(`SERVICE ERROR: Confirm email token ${id} was not found to update.`);
      error.statusCode = 401;
      throw error;
    }

    // Update token information only if we have a value
    if (updateData.UserId) foundToken.UserId = updateData.UserId;
    if (updateData.expiration) foundToken.expiration = updateData.expiration;

    // Save reset token instance to the database
    await foundToken.save();

    // Return the saved instance
    return foundToken;
  } catch (error) {
    throw error;
  }
};

export { updateOneByPk };
export default { oneByPk: updateOneByPk };
