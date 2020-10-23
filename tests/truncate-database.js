import { sequelize } from '../src/database';

const models = sequelize.models;

/**
 * TRUNCATE TABLE
 * --------------
 * Truncate a given table
 *
 * @param {String} modelName The name of the table model to be truncated
 */
const _truncateTable = (modelName) => {
  models[modelName].destroy({
    where: {},
    force: true,
  });
};

/**
 * TRUNCATE DATABASE TABLES
 * ------------------------
 * This will iterate through all of your models, and delete any data out of the database
 * associated with those models. Easy!
 * @param {*} model Sequelize model
 * @return {*} Promise once model truncated
 */
const truncate = async (model) => {
  if (model) {
    return _truncateTable(model);
  }

  return Promise.all(
    Object.keys(models).map((key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return _truncateTable(key);
    })
  );
};

export default truncate;
