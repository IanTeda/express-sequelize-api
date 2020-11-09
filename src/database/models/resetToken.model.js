import { DataTypes } from 'sequelize';
import crypto from 'crypto';
import moment from 'moment';
import base64url from 'base64url';

/**
 * Wrapper method for defining ResetToken model
 *
 * @ignore
 * @param {Sequelize} sequelize
 * @returns ResetToken model definition
 */
const resetTokenModel = (sequelize) => {
  /**
   * Definition of the ResetToken database model
   *
   * @name ResetToken
   * @typedef {Object} ResetToken - This is a ResetToken Model.
   * @property {Int} UserId - Foreign Key id.
   * @property {String} token - A JSON Web Token.
   * @property {Date} expiration - When does the reset token expire.
   * @property {Boolean} isUsed - Has the reset token already been used.
   */
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
    // token needs to be URL safe because it is passed as a query
    const token = base64url(crypto.randomBytes(64));
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
