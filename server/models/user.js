'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    username: {
      type:DataTypes.STRING(20), 
      allowNull: false, 
      unique: true
    }, 
    email: {
      type: DataTypes.STRING(150), 
      allowNull: false, 
      unique: true, 
      validate: {
        isEmail: {
          args: true, 
          msg: 'Must be a valid email address'
        }
      }
    }, 
    password:{
      type: DataTypes.STRING, 
      allowNull: false, 
    }, 
    imageUrl:{
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'users',

  });
  return user;
};