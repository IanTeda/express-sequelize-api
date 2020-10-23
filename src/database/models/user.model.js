import { DataTypes } from 'sequelize';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig, roles, statuses } from '../../../src/configs';

/**
 * USER MODEL DEFINITION
 * ---------------------
 * Define what the Thing model will look
 *
 * @param {Object} sequelize Sequelize instance to associate with the definition
 * @return {Object} Sequelize definition of a User
 */
const userModel = (sequelize) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'DATABASE ERROR: Users first name cannot be null.',
        },
        len: {
          args: [1, 24],
          msg: 'DATABASE ERROR: Users first name must between 1 and 24 characters.',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      unique: {
        msg: 'DATABASE ERROR: User email is already taken.',
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'DATABASE ERROR: User email format should be <foo@bar.com>.',
        },
        notNull: {
          msg: 'DATABASE ERROR: User email cannot be null.',
        },
        notEmpty: {
          msg: 'DATABASE ERROR: User email cannot be empty.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'DATABASE ERROR: User password cannot be null.',
        },
        notEmpty: {
          msg: 'DATABASE ERROR: User password cannot be empty.',
        },
        len: {
          args: [5, 72],
          msg: 'DATABASE ERROR: User password must between 5 and 72 characters.',
        },
      },
      // Method stops column showing in queries
      get() {
        return () => this.getDataValue('password');
      },
    },
    salt: {
      type: DataTypes.STRING,
      // allowNull: false,
      // Method stops column showing in queries
      get() {
        return () => this.getDataValue('salt');
      },
    },
    lastLogin: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    status: {
      type: DataTypes.ENUM(statuses),
      defaultValue: statuses[0],
    },
    role: {
      type: DataTypes.ENUM(roles),
      defaultValue: 'user',
    },
    isEmailConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  const _setSaltAndPassword = (user) => {
    if (user.changed('password')) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };

  User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64');
  };

  User.encryptPassword = (plainText, salt) => {
    return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
  };

  User.beforeCreate(_setSaltAndPassword);
  User.beforeUpdate(_setSaltAndPassword);
  User.beforeBulkUpdate(_setSaltAndPassword); // Model.update triggers beforeBulkUpdate

  User.prototype.authenticate = function (enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password();
  };

  User.prototype.generateJWT = function () {
    // Expire in 15 minutes as seconds
    const fifteenMinutes = (15 * 60);

    // Expire the JWT
    const expiresIn = { 
      expiresIn: fifteenMinutes
    };

    // JWT payload
    const payload = {
      id: this.id,
    };

    // Generate JWT
    const token = jwt.sign(payload, jwtConfig.secret, expiresIn );

    return token;
  };

  return User;
};

export default userModel;
