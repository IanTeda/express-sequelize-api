import { Authorization } from '../../database';

/**
 * Find and return a Authorization with primary key id in database table
 *
 * @memberof module:services/authorizations
 * @param {Int} primaryKey  Primary key id of thing to find
 * @return {Object}         A found thing instance
 * @throws Will throw an error if no primary key is not passed in
 * @throws Will throw an error if authorization instance is not returned
 * @see {@link https://sequelize.org/master/manual/model-querying-finders.html#-code-findbypk--code-|Sequelize Model Querying - Finders}
 * @example
 * import { authorizations as authorizationsService } from 'src/services';
 * const primaryKey = 1;
 * const foundAuthorization = await authorizationsService.findOneByPk(primaryKey);
 */
const findOneByPk = async (primaryKey) => {
  try {
    // Check a primary key ID has been passed in
    if (!primaryKey) {
      const error = new Error('SERVICE ERROR: No primary key provided in Authorization find request.');
      error.statusCode = 400;
      throw error;
    }

    // Find thing instance
    const foundAuthorization = await Authorization.findOne({
      where: {
        id: primaryKey,
      },
    });

    // Check there is a thing instance to return
    if (!foundAuthorization) {
      const error = new Error(`SERVICE ERROR: Authorization ${primaryKey} was not found.`);
      error.statusCode = 500;
      throw error;
    }

    return foundAuthorization;
  } catch (error) {
    throw error;
  }
};

/**
 * Find and return all Authorization in the database table
 *
 * @memberof module:services/authorizations
 * @param {Int} [offset]      Number of limit pages to offset the query
 * @param {Int} [limit]       Limit of query length
 * @param {String} [where]    Filter the query by where
 * @return {Array}            A JSON array of found things
 * @throws Throws error if found things instance isn't created
 * @see {@link https://sequelize.org/master/manual/model-querying-finders.html#-code-findall--code-|Sequelize Model Querying - Finders}
 * @example
 * import { authorizations as authorizationsService } from 'src/services';
 * const foundAuthorizations = await authorizationsService.findAll();
 */
const findAll = async (offset, limit, where) => {
  try {
    // Find all authorizations within the limit and offset, where filtered
    const foundAuthorizations = await Authorization.findAll({
      limit: limit,
      offset: offset,
      where: where,
    });

    // Check we have found things to return
    if (!foundAuthorizations) {
      const error = new Error(`SERVICE ERROR: Unable to find authorizations.`);
      error.statusCode = 500;
      throw error;
    }

    return foundAuthorizations;
  } catch (error) {
    throw error;
  }
};

/**
 * Find and return all things in database table with a count
 *
 * @memberof module:services/authorizations
 * @param {Int} [offset]    Number of limit pages to offset the query
 * @param {Int} [limit]     Limit of query length
 * @param {String} [where]  Filter the query by where
 * @returns {Object}        A count of things found and a JSON array of found things
 * @throws Throws error if findAndCountAll is not returned
 * @see {@link https://sequelize.org/master/manual/model-querying-finders.html#-code-findandcountall--code-|Sequelize Model Querying - Finders}
 * @example
 * import { authorizations as authorizationsService } from 'src/services';
 * const { count, rows } = await authorizationsService.findAndCount();
 */
const findAndCountAll = async (where, offset, limit) => {
  try {
    // Find and count all things within the limit and offset, where filtered
    const findAndCountAllAuthorizations = await Authorization.findAndCountAll({
      where: where,
      offset: offset,
      limit: limit,
    });

    // Check we have find and count to return
    if (!findAndCountAllAuthorizations) {
      const error = new Error(`SERVICE ERROR: Unable to find and count authorizations.`);
      error.statusCode = 500;
      throw error;
    }

    return findAndCountAllAuthorizations;
  } catch (error) {
    return error;
  }
};

export { findOneByPk, findAll, findAndCountAll };
export default { oneByPk: findOneByPk, all: findAll, allAndCount: findAndCountAll };
