/**
 * This file is part of Express Sequelize API
 * ------------------------------------------
 * @module services/resetTokens
 * @author Ian Teda <ian@teda.id.au>
 */

import { ResetToken } from '../../database';
import { logger } from '../../utils';
import moment from 'moment'

/**
 * VALIDATE RESET TOKEN
 * --------------------
 * @alias module:services/resetTokens.validateToken
 * 
 * Check if UserId and token returns a record. 
 * Then check record to see if it is used or expired.
 *
 * @param {String} UserId - User ID to check token against.
 * @param {String} token - Token to confirm.
 * @return {Boolean} - Return true if UserId and token validate.
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
  } catch (err) {
    // TODO: Do we throw an error or return false?
    // Log validation
    // If running a test log error message to console because logger doesn't when testing
    // if (process.env.NODE_ENV = 'test') console.log(err.message)
    logger.error(err.message);
    return false;
    // throw err
  }
};

export { validateToken };
export default { token: validateToken };
