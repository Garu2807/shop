'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, User }) {
      this.belongsToMany(Order, {
        through: 'OrderProducts',
        foreignKey: 'products_id',
        as: 'Orders',
      });
      this.belongsToMany(User, {
        through: 'Cart',
        foreignKey: 'products_id',
        as: 'Users',
      });
      // this.hasMany(Cart, { foreignKey: 'products_id' });
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
