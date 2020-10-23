import {DataTypes} from 'sequelize';
import crypto from 'crypto';
import moment from 'moment'

/**
 * RESET TOKEN MODEL DEFINITION
 * ----------------------------
 *  Define what the Thing model will look
 *
 * @param {*} sequelize Sequelize instance to associate with the definition
 * @return {*} Sequelize definition of a Reset Token
 */
const resetTokenModel = (sequelize) => {
  const ResetToken = sequelize.define('ResetToken', {
    // Foreign key for 1:n association
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      validate: {
        notNull: {
          msg: 'DATABASE ERROR: ResetToken UserId cannot be null.',
        },
        notEmpty: {
          msg: 'DATABASE ERROR: ResetToken UserId cannot be empty.',
        },
      },
    },
    token: DataTypes.STRING,
    expiration: DataTypes.DATE,
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  // Generate a 64 bit random token
  ResetToken.generateToken = () => {
    const token = crypto.randomBytes(64).toString('base64');
    return token;
  };

  ResetToken.plusTwentyFourHours = () => {
    // What is the date and time now
    const now = new Date();
    // Add 24 hours to now
    const expireDateTime = moment(now).add(24, 'hours');
    // Return a expiration as a date object
    return expireDateTime.toDate();
  };

  const _setTokenAndExpirationDate = (resetToken) => {
    // Set token
    resetToken.token = ResetToken.generateToken();
    // Set expiration date and time
    resetToken.expiration = ResetToken.plusTwentyFourHours();
  };

  // Before creating set the token and expiration date
  ResetToken.beforeCreate(_setTokenAndExpirationDate);

  return ResetToken;
};

export default resetTokenModel;
