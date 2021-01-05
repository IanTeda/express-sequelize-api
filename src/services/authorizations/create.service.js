import { Authorization } from '../../database';

/** 
 * Create an Authorization in the database
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
 * const authorizationData = {
 *   role: 'user',
 *   userId: 23,
 *   resource: '/things',
 *   resourceId: 11,
 *   permission: 'read'
 * };
 * const createdAuthorization = await authorizationsService.createOne(authorizationData);
 */
const createOne = async (authorizationData) => {
  try {
    // Check we have thing data to create with
    if (!authorizationData) {
      const error = new Error('SERVICE ERROR: Authorization createOne contained no data.');
      error.statusCode = 400;
      throw error;
    }

    // Build thing object
    const newAuthorizationData = {
      role: authorizationData.role,
      userId: authorizationData.userId,
      resource: authorizationData.resource,
      resourceId: authorizationData.resourceId,
      permission: authorizationData.permission,
    };

    // Create a new thing
    const createdAuthorization = await Authorization.create(newAuthorizationData);

    // Check we have a created thing instance to return
    if (!createdAuthorization) {
      const error = new Error(`SERVICE ERROR: Unable to create authorization.`);
      error.statusCode = 500;
      throw error;
    }

    return createdAuthorization;
  } catch (error) {
    throw error;
  }
};

export { createOne }
export default { one: createOne}
