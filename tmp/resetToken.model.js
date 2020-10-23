'use strict';
import crypto from 'crypto';
import moment from 'moment';

/**
 * RESET TOKEN MODEL
 * -----------------
 * 
 * @param {*} sequelize Connection instance
 * @param {*} DataTypes Sequelize datatype used to define
 * @return {*} ResetToken model instance
 */
module.exports = (sequelize, DataTypes) => {
  class ResetToken extends Model {

    /**
     * MODEL ASSOCIATIONS
     * ------------------
     * Put model associations in here
     * 
     * @param {Object} models 
     */
    static associate(models) {
      ResetToken.belongsTo(models.User);
    }
  }
  
  /**
   * RESET TOKEN MODEL
   * -----------------
   * Initiate RestToken model
   */
  ResetToken.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'DATABASE ERROR: Reset Token UserId cannot be null.',
          },
          notEmpty: {
            msg: 'DATABASE ERROR: Reset Token UserId cannot be empty.',
          },
        }
      },
      token: DataTypes.STRING,
      expiration: DataTypes.DATE,
      isUsed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize, // Pass the connection instance
      modelName: 'ResetToken', // We need to choose the model name
      tableName: "ResetTokens" // Added for completeness
    }
  );

  /**
   * GENERATE RESET TOKEN
   * --------------------
   * Generate a 64 bit random token
   */
  ResetToken.generateToken = () => {
    const token = crypto.randomBytes(64).toString('base64');
    return token;
  };

  /**
   * 
   */
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

// https://github.com/williampruden/sequelize-associations/tree/master/01_one-to-many
// https://medium.com/@andrewoons/how-to-define-sequelize-associations-using-migrations-de4333bf75a7
// https://levelup.gitconnected.com/creating-sequelize-associations-with-the-sequelize-cli-tool-d83caa902233
// https://sequelize.org/master/manual/creating-with-associations.html
// https://codehandbook.org/implement-has-many-association-in-sequelize/
