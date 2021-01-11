import Sequelize from 'sequelize';
import { database as config } from '../configs';
import { resetToken as resetTokenModel, thing as thingModel, user as userModel } from './models';
import confirmEmailTokenModel from './models/confirmEmailToken.model';

/**
 * Sequelize instance to be referenced through the server
 */
const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
 * Sequelize model for the Thing database table
 *
 * @module database/Thing
 */
const Thing = thingModel(sequelize);

/**
 * Sequelize model for the User database table
 *
 * @module database/User
 */
const User = userModel(sequelize);

/**
 * Sequelize model for the ResetToken database table
 *
 * @module database/ResetToken
 */
const ResetToken = resetTokenModel(sequelize);

/**
 * Sequelize model for the ConfirmEmailToken database table
 *
 * @module database/ConfirmEmailToken
 */
const ConfirmEmailToken = confirmEmailTokenModel(sequelize);

// Model associations
ResetToken.belongsTo(User);
User.hasMany(ResetToken);

ConfirmEmailToken.belongsTo(User);
User.hasMany(ConfirmEmailToken);

export { sequelize, Sequelize, Thing, User, ResetToken, ConfirmEmailToken };
