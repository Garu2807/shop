'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Product, Cart }) {
      // Связь с продуктами через корзину
      this.belongsToMany(Product, {
        through: 'Cart',
        foreignKey: 'users_id',
        as: 'Products',
      });

      // Связь с корзиной, каскадное удаление
      this.hasMany(Cart, {
        foreignKey: 'users_id',
        onDelete: 'CASCADE', // Каскадное удаление
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
