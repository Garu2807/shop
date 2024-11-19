'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ Order, User, Cart }) {
      // Связь с заказами через промежуточную таблицу OrderProducts
      this.belongsToMany(Order, {
        through: 'OrderProducts',
        foreignKey: 'products_id',
        as: 'Orders',
      });

      // Связь с пользователями через корзину (Cart)
      this.belongsToMany(User, {
        through: 'Cart',
        foreignKey: 'products_id',
        as: 'Users',
      });

      // Связь с корзиной, каскадное удаление
      this.hasMany(Cart, {
        foreignKey: 'products_id',
        onDelete: 'CASCADE', // Важный момент: каскадное удаление
      });
    }
  }

  Product.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      brand: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      sex: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      size: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
