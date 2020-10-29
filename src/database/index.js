import Sequelize from 'sequelize';
import { database as config } from '../configs';
import { thing as thingModel, user as userModel, resetToken as resetTokenModel } from './models';

/**
 * Sequelize instance to be referenced through the server
 */
const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
 * Sequelize model for the Thing database table
 */
const Thing = thingModel(sequelize);

/**
 * Sequelize model for the User database table
 */
const User = userModel(sequelize);

/**
 * Sequelize model for the Reset Token database table
 */
const ResetToken = resetTokenModel(sequelize);

// Model associations
ResetToken.belongsTo(User);
User.hasMany(ResetToken);

export { sequelize, Sequelize, Thing, User, ResetToken };
