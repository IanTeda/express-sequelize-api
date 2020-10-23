import {DataTypes} from 'sequelize'

/**
 * THING MODEL DEFINITION
 * ----------------------
 * Define what the Thing model will look
 *
 * @param {Object} sequelize Sequelize instance to associate with the definition
 * @return {Object} Sequelize definition of a Thing
 */
const thingModel = (sequelize) => {
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
