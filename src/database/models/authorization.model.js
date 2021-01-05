import { DataTypes } from 'sequelize';
import { roles as rolesEnum, permissions as permissionsEnum, resources as resourcesEnum } from '../../../src/configs';

/**
 * Wrapper method for defining the Thing
 *
 * @ignore
 * @param {Object} sequelize Sequelize instance to associate with the definition
 * @returns {Object} Sequelize definition of a Thing
 */
const authorizationModel = (sequelize) => {

  const roles = Object.values(rolesEnum);
  const permissions = Object.values(permissionsEnum)
  const resources = Object.values(resourcesEnum)

  /**
   * Definition of the Authorization database model
   *
   * @name Authorization
   * @typedef {Object} Authorization - This is a Authorization model.
   * @property {String} role - Name of the Thing
   * @property {String} userId - Description of the Thing.
   * @property {String} resource - The price of the Thing.
   * @property {String} resourceId
   * @property {String} permission
   */
  const Authorization = sequelize.define('Authorization', {
    role: {
      type: DataTypes.ENUM(roles),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'DATABASE ERROR: Authorization role cannot be null.',
        },
        notEmpty: {
          msg: 'DATABASE ERROR: Authorization role cannot be empty.',
        },
        isIn: {
          args: [roles],
          msg: `DATABASE ERROR: Authorization role must be one of "${roles.toString()}".`,
        },
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'DATABASE ERROR: Authorization userId cannot be null.',
        },
        notEmpty: {
          msg: 'DATABASE ERROR: Authorization userId cannot be empty.',
        },
        isInt: {
          msg: 'DATABASE ERROR: Authorization userId must be an Integer.'
        }
      }
    },
    resource: {
      type: DataTypes.ENUM(resources),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'DATABASE ERROR: Authorization resource cannot be null.',
        },
        notEmpty: {
          msg: 'DATABASE ERROR: Authorization resource cannot be empty.',
        },
        isIn: {
          args: [resources],
          msg: `DATABASE ERROR: Authorization resource must be one of "${resources.toString().replace(/\//g, '\\/')}".`,
        },
      }
    },
    resourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'DATABASE ERROR: Authorization resourceId cannot be null.',
        },
        notEmpty: {
          msg: 'DATABASE ERROR: Authorization resourceId cannot be empty.',
        },
        isInt: {
          msg: 'DATABASE ERROR: Authorization resourceId must be an Integer.'
        }
      }
    },
    permission: {
      type: DataTypes.ENUM(permissions),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'DATABASE ERROR: Authorization permission cannot be null.',
        },
        notEmpty: {
          msg: 'DATABASE ERROR: Authorization permission cannot be empty.',
        },    
        isIn: {
          args: [permissions],
          msg: `DATABASE ERROR: Authorization permission must be one of "${permissions.toString()}".`,
        },
      }
    },
  });

  return Authorization;
};

export default authorizationModel;
