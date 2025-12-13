// models/Order.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate({ User, Product, OrderProduct }) {
      // Связь с пользователем
      this.belongsTo(User, { foreignKey: 'user_id', as: 'User' });

      // Связь с продуктами через OrderProducts
      this.belongsToMany(Product, {
        through: OrderProduct,
        foreignKey: 'order_id',
        otherKey: 'product_id',
        as: 'Products',
      });

      // Связь с платежами (если есть модель Payment)
      // this.hasMany(models.Payment, { foreignKey: 'order_id', as: 'Payments' });

      // Связь с доставкой (если есть модель Shipping)
      // this.hasOne(models.Shipping, { foreignKey: 'order_id', as: 'Shipping' });
    }
  }

  Order.init(
    {
      user_id: {
        // Изменено с users_id на user_id
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending',
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          min: 0,
        },
      },
      shipping_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'Orders',
    }
  );

  return Order;
};
