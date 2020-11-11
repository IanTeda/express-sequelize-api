import { Thing } from '../../database';

/**
 * Find and return a thing with primary key id in database table
 *
 * @memberof module:services/things
 * @param {Int} id Primary key id of thing to find
 * @return {Object} A found thing instance
 * @throws Will throw an error if no user id is passed in
 * @throws Will throw an error if thing instance is not returned
 * @see {@link https://sequelize.org/master/manual/model-querying-finders.html#-code-findbypk--code-|Sequelize Model Querying - Finders}
 * @example
 * import { things as thingsService } from '/src/services';
 * const id = 1;
 * const thing = await thingsService.findOneByPk(id);
 */
const findOneByPk = async (id) => {
  try {
    // Check a primary key ID has been passed in
    if (!id) {
      const error = new Error('SERVICE ERROR: No id provided in Thing find request.');
      error.statusCode = 400;
      throw error;
    }

    // Find thing instance
    const thing = await Thing.findOne({
      where: {
        id: id,
      },
    });

    // Check there is a thing instance to return
    if (!thing) {
      const error = new Error(`SERVICE ERROR: Thing ${id} was not found.`);
      error.statusCode = 500;
      throw error;
    }

    return thing;
  } catch (error) {
    throw error;
  }
};

/**
 * Find and return all things in the database table
 *
 * @memberof module:services/things
 * @param {Int} [offset] Number of limit pages to offset the query
 * @param {Int} [limit] Limit of query length
 * @param {String} [where] Filter the query by where
 * @return {Array} A JSON array of found things
 * @throws Throws error if found things instance isn't created
 * @see {@link https://sequelize.org/master/manual/model-querying-finders.html#-code-findall--code-|Sequelize Model Querying - Finders}
 * @example
 * import { things as thingsService } from '/src/services';
 * const allThings = await thingsService.findAll();
 */
const findAll = async (offset, limit, where) => {
  try {
    // Find all things within the limit and offset, where filtered
    const foundThings = await Thing.findAll({
      limit: limit,
      offset: offset,
      where: where,
    });

    // Check we have found things to return
    if (!foundThings) {
      const error = new Error(`SERVICE ERROR: Unable to find things.`);
      error.statusCode = 500;
      throw error;
    }

    return foundThings;
  } catch (error) {
    throw error;
  }
};

/**
 * Find and return all things in database table with a count
 *
 * @memberof module:services/things
 * @param {Int} [offset] Number of limit pages to offset the query
 * @param {Int} [limit] Limit of query length
 * @param {String} [where] Filter the query by where
 * @returns {Object} A count of things found and a JSON array of found things
 * @throws Throws error if findAndCountAll is not returned
 * @see {@link https://sequelize.org/master/manual/model-querying-finders.html#-code-findandcountall--code-|Sequelize Model Querying - Finders}
 * @example
 * import { things as thingsService } from '/src/services'
 * const { count, rows } = await thingsService.findAndCount();
 */
const findAndCountAll = async (where, offset, limit) => {
  try {
    // Find and count all things within the limit and offset, where filtered
    const findAndCountAll = await Thing.findAndCountAll({
      where: where,
      offset: offset,
      limit: limit,
    });

    // Check we have find and count to return
    if (!findAndCountAll) {
      const error = new Error(`SERVICE ERROR: Unable to find and count things.`);
      error.statusCode = 500;
      throw error;
    }

    return findAndCountAll;
  } catch (err) {
    return err;
  }
};

export { findOneByPk, findAll, findAndCountAll };
export default { oneByPk: findOneByPk, all: findAll, allAndCount: findAndCountAll };
