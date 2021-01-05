import { Authorization } from '../../database';

/** 
 * Destroy a Authorization with the primary key id in the database table
 * 
 * @memberof module:services/authorizations
 * @param {Int} primaryKey  Primary key id of authorization to destroy
 * @return {Int}            Number of things deleted
 * @throws Will throw an error if no primary key passed in
 * @throws Will throw an error if authorization count is not created
 * @example
 * import { authorizations as authorizationsService } from 'src/services';
 * const primaryKey = 1;
 * const destroyedCount = await authorizationsService.destroyOneByPk(primaryKey)
 */
const destroyOneByPk = async (primaryKey) => {
  try {
    // Check we have a primary key id passed in
    if (!primaryKey) {
      const error = new Error('SERVICE ERROR: No primary key id provided in Authorization destroy request.');
      error.statusCode = 500;
      throw error;
    }

    // Return number of rows destroyed
    const destroyedAuthorizationsCount = await Authorization.destroy({
      where: {
        id: primaryKey,
      },
    });

    // Check there is a destroyed thing count to return
    if (!destroyedAuthorizationsCount) {
      const error = new Error(`SERVICE ERROR: Authorization ${primaryKey} was not found to destroy.`);
      error.statusCode = 500;
      throw error;
    }

    return destroyedAuthorizationsCount;
  } catch (error) {
    throw error;
  }
};

/** 
 * Destroy all Authorization in the database
 * 
 * @memberof module:services/authorizations
 * @return {Int}        A count of the thing rows destroyed
 * @throws Will throw an error if no destroy count is created
 * @example
 * import { authorizations as authorizationsService } from 'src/services';
 * const count = await authorizationsService.destroyAll()
 */
const destroyAll = async () => {
  try {
    // Count the number of things destroyed
    const destroyedAuthorizationCount = await Authorization.destroy({
      where: {},
      truncate: false,
    });

    // Check there is a destroyed thing count to return
    if (!destroyedAuthorizationCount) {
      const error = new Error(`SERVICE ERROR: All Authorization where not destroyed.`);
      error.statusCode = 500;
      throw error;
    }

    return destroyedAuthorizationCount;
  } catch (error) {
    throw error;
  }
};

export { destroyOneByPk, destroyAll };
export default { oneByPk: destroyOneByPk, all: destroyAll };
