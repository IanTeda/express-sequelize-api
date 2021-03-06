import { DataTypes } from 'sequelize';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig, roles, statuses } from '../../../src/configs';

/**
 * Define what the Thing model will look
 *
 * @ignore
 * @param {Object} sequelize Sequelize instance to associate with the definition
 * @return {Object} Sequelize definition of a User
 */
const userModel = (sequelize) => {
  /**
   * Definition of the User database model
   *
   * @name User
   * @typedef {Object} User - This is the User Model.
   * @property {String} firstName - First name of the User.
   * @property {String} lastName - Second name of the User
   * @property {String} fullName - First and second name of the User.
   * @property {String} email - Email address of the user.
   * @property {String} password - Hashed password for the user to login with.
   * @property {String} salt - Salt used to hash the password for the User.
   * @property {Date} lastLogin - When was the last time the User logged in.
   * @property {Enum} status - The status of the User account.
   * @property {Enum} role - The role of the user has.
   * @property {Boolean} isEmailConfirmed - Has the user confirmed there email address.
   */
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
      type: DataTypes.ENUM(Object.values(statuses)),
      defaultValue: statuses.ACTIVE,
    },
    role: {
      type: DataTypes.ENUM(Object.values(roles)),
      defaultValue: roles.GUEST,
    },
    isEmailConfirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  /**
   * Set the user salt and hashed password.
   * @param {Object} user
   */
  const _setSaltAndPassword = (user) => {
    if (user.changed('password')) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };

  /**
   * Generate a random salt that will be used to hash the password.
   */
  User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64');
  };

  /**
   *
   * @param {String} plainTextPassword - Plain password to encrypt with the salt.
   * @param {String} salt - Salt used to encrypt the password before saving.
   */
  User.encryptPassword = (plainTextPassword, salt) => {
    return crypto.createHash('RSA-SHA256').update(plainTextPassword).update(salt).digest('hex');
  };

  // User model hooks
  User.beforeCreate(_setSaltAndPassword);
  User.beforeUpdate(_setSaltAndPassword);
  User.beforeBulkUpdate(_setSaltAndPassword); // Model.update triggers beforeBulkUpdate

  /**
   * Check the plain text password equals the hashed password
   *
   * @param {String} enteredPassword - Plain text password to authenticate
   */
  User.prototype.authenticate = function (plainTextPassword) {
    return User.encryptPassword(plainTextPassword, this.salt()) === this.password();
  };

  /**
   * Generate a JSON Web Token for the given user.
   */
  User.prototype.generateJWT = function () {
    // Expire in 15 minutes as seconds
    const fifteenMinutes = 15 * 60;

    // Expire the JWT
    const expiresIn = {
      expiresIn: fifteenMinutes,
    };

    // JWT payload
    const payload = {
      id: this.id,
    };

    // Generate JWT
    const token = jwt.sign(payload, jwtConfig.secret, expiresIn);

    return token;
  };

  /**
   * Is the users account active
   */
  User.prototype.isActive = function () {
    if (this.status === 'active') {
      return true;
    } else {
      return false;
    }
  };

  return User;
};

export default userModel;
