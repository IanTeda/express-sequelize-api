import { findOneByPk } from './find.service';

/** 
 * Update and return authorization with id in database table
 *
 * @memberof module:services/authorizations
 * @param {Object} authorization              Authorization object data to create
 * @param {String} authorization.role         Authorization role
 * @param {String} authorization.userId       Authorization userId to limit role
 * @param {String} authorization.resource     Authorization resource
 * @param {String} authorization.resourceId   Authorization resource id to limit
 * @param {String} authorization.permission   Authorization permission
 * @returns {Object}                          A created authorization instance
 * @throws Will throw an error if there is no authorizationData to create with
 * @throws Will throw an error if a create authorization instance is not created
 * @example
 * import { authorizations as authorizationsService } from 'src/services';
 * const primaryKey = 1;
 * const authorizationUpdateData = {
 *   role: 'user',
 *   userId: 23,
 *   resource: '/things',
 *   resourceId: 11,
 *   permission: 'read'
 * };
 * const updatedResetToken = await resetTokensService.updateOneByPk(primaryKey, authorizationUpdateData)
 */
const updateOneByPk = async (primaryKey, authorizationUpdateData) => {
  try {
    // Check we have a primary key id and data to update
    if (!primaryKey || !authorizationUpdateData) {
      const error = new Error('SERVICE ERROR: Insufficient parameters in Authorization update request.');
      error.statusCode = 500;
      throw error;
    }

    // Find thing to be updated
    let foundAuthorization = await findOneByPk(primaryKey);

    // Update thing information only if we have a value
    if (authorizationUpdateData.role) foundAuthorization.role = authorizationUpdateData.role;
    if (authorizationUpdateData.userId) foundAuthorization.userId = authorizationUpdateData.userId;
    if (authorizationUpdateData.resource) foundAuthorization.resource = authorizationUpdateData.resource;
    if (authorizationUpdateData.resourceId) foundAuthorization.resourceId = authorizationUpdateData.resourceId;
    if (authorizationUpdateData.permission) foundAuthorization.permission = authorizationUpdateData.permission;

    // Save thing instance to the database
    await foundAuthorization.save();

    // Return the saved instance
    return foundAuthorization;
  } catch (error) {
    throw error;
  }
};

export { updateOneByPk };
export default { oneByPk: updateOneByPk };
