'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate({ User, Product }) {
      // Связь с пользователем
      this.belongsTo(User, {
        foreignKey: 'users_id',
        onDelete: 'CASCADE', // Каскадное удаление
      });

      // Связь с продуктом
      this.belongsTo(Product, {
        foreignKey: 'products_id',
        onDelete: 'CASCADE', // Каскадное удаление
      });
    }
  }

  Cart.init(
    {
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      products_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );

  return Cart;
};
