'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Product, Cart }) {
      this.hasMany(Cart, { foreignKey: 'users_id' });
      this.belongsToMany(Product, {
        through: 'Cart',
        foreignKey: 'users_id',
        as: 'Products',
      });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
