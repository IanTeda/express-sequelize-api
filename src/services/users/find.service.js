/**
 * This file is part of Express Sequelize API
 * ------------------------------------------
 * @module server.service.users
 * @author [Ian Teda] <ian@teda.id.au>
 */
import { User } from '../../database';

/**
 * FIND ALL USERS
 * --------------
 * Find and return all USERS in the database table
 *
 * @param {Int} offset Number of limit pages to offset the query
 * @param {Int} limit Limit of query length
 * @param {String} where Filter the query by where
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
      error.statusCode = 501;
      throw error;
    }

    return foundUsers;
  } catch (error) {
    throw error;
  }
};

/**
 * FIND AND COUNT ALL ROWS
 * -----------------------
 * Find and return all users in database table with a count
 * 
 * @param {Int} offset Number of limit pages to offset the query
 * @param {Int} limit Limit of query length
 * @param {String} where Filter the query by where
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
      error.statusCode = 501;
      throw error;
    }

    return findAndCountAllUsers;
  } catch (err) {
    return err;
  }
};

/**
 * FIND USER WITH ID
 * -----------------
 * Find and return user instance with id in database table
 *
 * @param {Int} id Primary key id of user to find
 * @returns User instance
 */
const findOneByPk = async (id) => {
  try {
    // Check a primary key user ID has been passed in
    if (!id) {
      const error = new Error('SERVICE ERROR: No id provided in user find request.');
      error.statusCode = 501;
      throw error;
    }

    // Find user instance
    const foundUser = await User.findOne({
      where: { id: id },
    });

    // Check we have a found user instance to return
    if (!foundUser) {
      const error = new Error(`SERVICE ERROR: User ${id} was not found.`);
      error.statusCode = 501;
      throw error;
    }

    return foundUser;
  } catch (error) {
    throw error;
  }
};

/**
 * FIND USER BY EMAIL
 * ------------------
 * Find and return user instance with a given email address
 *
 * @param {String} email Email address of user to find
 * @returns User instance
 */
const findOneByEmail = async (email) => {
  try {
    // Check we have a user email passed in to find
    if (!email) {
      const error = new Error('SERVICE ERROR: No email provided in user find request.');
      error.statusCode = 501;
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
      const error = new Error(`SERVICE ERROR: User with ${email} was not found.`);
      error.statusCode = 501;
      throw error;
    }

    return foundUser;
  } catch (error) {
    throw error;
  }
};

export { findAll, findAndCountAll, findOneByPk, findOneByEmail };
export default { all: findAll, andCountAll: findAndCountAll, oneByPk: findOneByPk, oneByEmail: findOneByEmail };
