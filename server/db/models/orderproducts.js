'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Связь с заказом
      this.belongsTo(models.Order, {
        foreignKey: 'order_id',
        onDelete: 'CASCADE',
        as: 'Order',
      });

      // Связь с продуктом
      this.belongsTo(models.Product, {
        foreignKey: 'product_id',
        onDelete: 'CASCADE',
        as: 'Product',
      });
    }
  }

  OrderProduct.init(
    {
      order_id: {
        // Изменено с orders_id на order_id
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      product_id: {
        // Изменено с products_id на product_id
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
        validate: {
          min: 1,
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: 'OrderProduct', // Используем единственное число
      tableName: 'OrderProducts', // Имя таблицы может быть множественным числом
      timestamps: false, // Если не нужны createdAt и updatedAt
      indexes: [
        {
          unique: true,
          fields: ['order_id', 'product_id'],
        },
      ],
    }
  );

  return OrderProduct;
};
