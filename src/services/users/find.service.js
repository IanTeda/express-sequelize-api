import { User } from '../../database';

/**
 * Find and return all USERS in the database table
 *
 * @memberof module:services/users
 * @param {Int} id Primary key id of user to find
 * @return {Object} A found user instance
 * @throws Throws error if foundUsers array isn't created
 * @see {@link https://sequelize.org/master/manual/model-querying-finders.html#-code-findall--code-|Sequelize Model Querying - Finders}
 * @example
 * import { users as usersService } from '/src/services';
 * const foundUsers = await usersService.findAll();
 */
const findAll = async (offset, limit, where) => {
  try {
    // Find all users within the limit and offset, where the query is filtered
    const foundUsers = await User.findAll({
      limit: limit,
      offset: offset,
      where: where,
    });

    // Check we have found users to return
    if (!foundUsers) {
      const error = new Error(`SERVICE ERROR: Unable to find users.`);
      error.statusCode = 500;
      throw error;
    }

    return foundUsers;
  } catch (error) {
    throw error;
  }
};

/**
 * Find and return all users in database table with a count
 * 
 * @memberof module:services/users
 * @param {Int} [offset] Number of limit pages to offset the query
 * @param {Int} [limit] Limit of query length
 * @param {String} [where] Filter the query by where
 * @returns {Object} A count of users found and a JSON array of found things
 * @throws Throws and error if findAndCountAll is not returned
 * @see {@link https://sequelize.org/master/manual/model-querying-finders.html#-code-findandcountall--code-|Sequelize Model Querying - Finders}
 * @example
 * import { users as usersService } from '/src/services'
 * const { count, rows } = await usersService.findAndCount();
 */
const findAndCountAll = async (where, offset, limit) => {
  try {
    // Find and count all users within a limit and offset, where filtered
    const findAndCountAllUsers = await User.findAndCountAll({
      where: where,
      offset: offset,
      limit: limit,
    });

    // Check we have found users and count to return
    if (!findAndCountAllUsers) {
      const error = new Error(`SERVICE ERROR: Unable to find and count users.`);
      error.statusCode = 500;
      throw error;
    }

    return findAndCountAllUsers;
  } catch (err) {
    return err;
  }
};

/**
 * Find and return user instance with id in database table
 *
 * @memberof module:services/users
 * @param {Int} id Primary key id of user to find
 * @returns {Object} A found user instance
 * @throws Will throw an error if no primary key id is not passed in
 * @throws Will throw an error if user instance is not returned
 * @see {@link https://sequelize.org/master/manual/model-querying-finders.html#-code-findbypk--code-|Sequelize Model Querying - Finders}
 * @example
 * import { users as usersService } from '/src/services';
 * const id = 1;
 * const thing = await usersService.findOneByPk(id);
 */
const findOneByPk = async (id) => {
  try {
    // Check a primary key user ID has been passed in
    if (!id) {
      const error = new Error('SERVICE ERROR: No id provided in user find request.');
      error.statusCode = 500;
      throw error;
    }

    // Find user instance
    const foundUser = await User.findOne({
      where: { id: id },
    });

    // Check we have a found user instance to return
    if (!foundUser) {
      const error = new Error(`SERVICE ERROR: User ${id} was not found.`);
      error.statusCode = 500;
      throw error;
    }

    return foundUser;
  } catch (error) {
    throw error;
  }
};

/**
 * Find and return user instance for a given email address.
 *
 * @memberof module:services/users
 * @param {String} email Email address of user to find.
 * @return {Object} A found user instance.
 * @throws Will throw an error if no user email is passed in
 * @throws Will throw an error if user instance is not returned
 * @example
 * import { users as usersService } from '/src/services';
 * const email = 'joe.blogs@hottmail.com';
 * const user = await usersService.findOneByEmail(id);
 */
const findOneByEmail = async (email) => {
  try {
    // Check we have a user email passed in to find
    if (!email) {
      const error = new Error('SERVICE ERROR: No email provided in user find request.');
      error.statusCode = 500;
      throw error;
    }

    // Found user instance
    const foundUser = await User.findOne({
      where: { 
        email: email 
      },
    });

    // Check we have a found user instance to return
    if (!foundUser) {
      const error = new Error(`SERVICE ERROR: User ${email} was not found.`);
      error.statusCode = 500;
      throw error;
    }

    return foundUser;
  } catch (error) {
    throw error;
  }
};

export { findAll, findAndCountAll, findOneByPk, findOneByEmail };
export default { all: findAll, andCountAll: findAndCountAll, oneByPk: findOneByPk, oneByEmail: findOneByEmail };
