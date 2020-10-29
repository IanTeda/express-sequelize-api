import { ResetToken } from '../../database';
import { logger } from '../../utils';
import moment from 'moment'

/**
 * Check if UserId and token returns a record. Then check the record to see if it is used or expired.
 *
 * @memberof module:services/resetTokens
 * @param {String} UserId User ID to check token against.
 * @param {String} token Token to confirm.
 * @return {Boolean} Return true if UserId and token is validate.
 * @requires module:database/ResetToken
 * @requires module:utils/logger
 * @requires moment
 * @example
 * import { resetTokens as resetTokensService } from '/src/services';
 * const UserId = 1;
 * const token = 'kjdfoOIJDFioeh390udfLKJ09dufjoidfj';
 * const isValid = resetTokensService(UserId, token);
 */
const validateToken = async (UserId, token) => {
  try {

    // Check UserId and token value has been passed in
    if (!UserId || !token) throw new Error('SERVICE ERROR: Insufficient parameters to validate reset token.');

    // Find the reset token instance
    const foundResetToken = await ResetToken.findOne({
      where: {
        UserId: UserId,
        token: token,
      },
    });

    // Check if a reset token instance was returned
    if (!foundResetToken) throw new Error('SERVICE ERROR: Invalid reset token.');

    // Check if the reset token record has already been used
    if (foundResetToken.isUsed) throw new Error('SERVICE ERROR: Reset token has already been used.');

    // Check if the reset token has expired
    const now = new Date();
    if (moment(now).isAfter(moment(foundResetToken.expiration))) throw new Error('SERVICE ERROR: Reset token has expired.');

    return true;
  } catch (error) {
    // If running a test log error message to console because logger doesn't when testing
    // if (process.env.NODE_ENV = 'test') console.log(err.message)
    logger.error(error.message);
    return false;
    // throw error
  }
};

export { validateToken };
export default { token: validateToken };
