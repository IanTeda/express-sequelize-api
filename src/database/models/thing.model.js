import {DataTypes} from 'sequelize'

/** 
 * Wrapper method for defining the Thing
 * 
 * @ignore
 * @param {Object} sequelize Sequelize instance to associate with the definition
 * @returns {Object} Sequelize definition of a Thing
 */
const thingModel = (sequelize) => {
  /** 
   * Definition of the Thing database model
   * 
   * @name Thing
   * @typedef {Object} Thing - This is a Thing Model.
   * @property {String} name - Name of the Thing
   * @property {String} description - Description of the Thing.
   * @property {Decimal} price - The price of the Thing.
   */
  const Thing = sequelize.define('Thing', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'DATABASE ERROR: Thing name is already taken.',
      },
      validate: {
        notEmpty: {
          msg: 'DATABASE ERROR: Thing name cannot be empty.',
        },
        notNull: {
          msg: 'DATABASE ERROR: Thing name cannot be null.',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'DATABASE ERROR: Thing price cannot be empty.',
        },
        notNull: {
          msg: 'DATABASE ERROR: Thing price cannot be null.',
        },
      },
    },
  });
  
  return Thing;
};

export default thingModel;
