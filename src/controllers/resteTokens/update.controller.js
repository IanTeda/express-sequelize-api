import { resetTokens as resetTokensService } from '../../services';

/**
 * Update a request token record.
 *
 * @memberof module:controllers/resetTokens
 * @param {Object} request HTTP request object.
 * @param {Object} response HTTP response object callback.
 * @param {Object} next Call the next route callback handler.
 * @returns Will return a http response body
 * @throws Will throw an error if no request.params is passed in.
 * @throws Will throw an error if no request.params.id is passed in.
 * @throws Will throw an error if no request.body is passed in.
 * @throws Will throw an error if no updatedResetToken is created.
 */
const updateOne = async (request, response, next) => {
  try {
    // Check we have request params
    if (!request.params) {
      const error = new Error('CONTROLLER ERROR: Your update one reset token request did not contain any request params.');
      error.statusCode = 501;
      throw error;
    }

    // Parse request params
    const { id } = request.params;

    // Check we have a user primary key id to update
    if (!id) {
      const error = new Error('CONTROLLER ERROR: Your update one reset token request did not contain an id param.');
      error.statusCode = 501;
      throw error;
    }

    // Check we have a request body
    if (!request.body) {
      const error = new Error('CONTROLLER ERROR: Your update reset token request did not contain a request body.');
      error.statusCode = 501;
      throw error;
    }

    // Parse request body
    const { email, expiration, isUsed } = request.body;

    // Update data
    const updateResetTokenData = {
      email: email,
      expiration: expiration,
      isUsed: isUsed,
    };

    // Update user record
    const updatedResetToken = await resetTokensService.updateOneByPk(id, updateResetTokenData);

    // Check we have an updated user record
    if (!updatedResetToken) {
      const error = new Error(`CONTROLLER ERROR: Unable to update reset token ${id} record.`);
      error.statusCode = 501;
      throw error;
    }

    // Return updated user data
    const responseBody = response.status(201).json({
      status: 201,
      message: `SUCCESS: Updated reset token ${id} record.`,
      data: updatedResetToken,
    });

    return responseBody;
  } catch (error) {
    next(error);
  }
};

export { updateOne };
export default { one: updateOne };
