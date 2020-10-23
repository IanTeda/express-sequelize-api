import Sequelize from 'sequelize';
import { database as config } from '../configs';
import { thing as thingModel, user as userModel, resetToken as resetTokenModel } from './models';

/**
 * SEQUELIZE INSTANCE
 * ------------------
 * Sequelize instance to be referenced through the server
 *
 * @type {object} Sequelize Instance
 */
const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
 * THING MODEL
 * -----------
 * Sequelize model for the Thing database table
 *
 * @type {Object} Thing sequelize model
 */
const Thing = thingModel(sequelize);

/**
 * USER MODEL
 * -----------
 * Sequelize model for the User database table
 *
 * @type {Object} User sequelize model
 */
const User = userModel(sequelize);

/**
 * RESET TOKEN MODEL
 * -----------
 * Sequelize model for the Reset Token database table
 *
 * @type {Object} User sequelize model
 */
const ResetToken = resetTokenModel(sequelize);

// Model associations
ResetToken.belongsTo(User);
User.hasMany(ResetToken);

export { sequelize, Sequelize, Thing, User, ResetToken };
