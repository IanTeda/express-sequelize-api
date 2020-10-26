import { ResetToken } from '../../database';

/**
 * UPDATE RESET TOKEN BY PRIMARY KEY
 * ---------------------------------
 * Find and update reset token record
 *
 * @param {Number} id - Primary key to find.
 * @param {Object} data - JSON object of data to update.
 * @param {String} [data.email] - Email data to update record.
 * @param {Boolean} [data.isUsed] - Has the token been used.
 * @returns {Object} - JSON token object.
 */
const updateOneByPk = async (id, data) => {
  try {
    // Check we have the required paramter
    if (!id || !data) {
      const error = new Error('SERVICE ERROR: Insufficient parameters in reset token update request.');
      error.statusCode = 401;
      throw error;
    }

    // Find user to be updated
    const record = await ResetToken.findOne({
      where: {
        id: id,
      },
    });

    // Check we have a reset token record
    if (!record) {
      const error = new Error(`SERVICE ERROR: Reset token ${id} was not found to update.`);
      error.statusCode = 401;
      throw error;
    }

    // Update reset token information only if we have a value
    if (data.email) record.email = data.email;
    if (data.isUsed) record.isUsed = data.isUsed;

    // Save reset token instance to the database
    await record.save();

    // Return the saved instance
    return record;
  } catch (error) {
    throw error;
  }
};

// /**
//  * SET TOKENS USED
//  * ===============
//  * Set all token records for given email as isUsed
//  *
//  * @param {String} email - Email to set all token records as isUsed TRUE
//  * @returns {Boolean | Error} - Return TRUE if updated or error
//  */
// const updateTokensUsedByEmail = async (email) => {
//   try {
//     if (!email) {
//       const error = new Error('SERVICE ERROR: No email was provided to update reset tokens used.');
//       // TODO think through status code to use in this authentication workflow
//       error.statusCode = 401;
//       throw error;
//     }

//     // Update all tokens for given email to isUsed:true
//     await ResetToken.update(
//       {
//         isUsed: true,
//       },
//       {
//         where: {
//           email: email,
//         },
//       }
//     );

//     return true;
//   } catch (error) {
//     throw error;
//   }
// };

export { updateOneByPk };
export default { oneByPk: updateOneByPk };
