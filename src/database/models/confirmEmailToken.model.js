import { DataTypes } from 'sequelize';
import crypto from 'crypto';
import moment from 'moment';
import base64url from 'base64url';

/**
 * Wrapper method for defining ResetToken model
 *
 * @ignore
 * @param {Sequelize} sequelize
 * @returns ConfirmEmailToken model definition
 */
const confirmEmailTokenModel = (sequelize) => {
  /**
   * Definition of the ResetToken database model
   *
   * @name ConfirmEmailToken
   * @typedef {Object} ConfirmEmailToken - This is a ConfirmEmailToken Model.
   * @property {Int} UserId - Foreign Key id.
   * @property {String} token - 64bit random token.
   * @property {Date} expiration - When the token expires.
   */
  const ConfirmEmailToken = sequelize.define('ConfirmEmailToken', {
    // Foreign key for 1:n association
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      validate: {
        notNull: {
          msg: 'DATABASE ERROR: ConfirmEmailToken UserId cannot be null.',
        },
        notEmpty: {
          msg: 'DATABASE ERROR: ConfirmEmailToken UserId cannot be empty.',
        },
      },
    },
    token: DataTypes.STRING,
    expiration: DataTypes.DATE,
  });

  // Generate a 64 bit random token
  ConfirmEmailToken.generateToken = () => {
    // token needs to be URL safe because it is passed as a query
    const token = base64url(crypto.randomBytes(64));
    return token;
  };

  ConfirmEmailToken.plusTwentyFourHours = () => {
    // What is the date and time now
    const now = new Date();
    // Add 24 hours to now
    const expireDateTime = moment(now).add(24, 'hours');
    // Return a expiration as a date object
    return expireDateTime.toDate();
  };

  const _setTokenAndExpirationDate = (confirmEmailToken) => {
    // Set token
    confirmEmailToken.token = ConfirmEmailToken.generateToken();
    // Set expiration date and time
    confirmEmailToken.expiration = ConfirmEmailToken.plusTwentyFourHours();
  };

  // Before creating set the token and expiration date
  ConfirmEmailToken.beforeCreate(_setTokenAndExpirationDate);

  return ConfirmEmailToken;
};

export default confirmEmailTokenModel;
