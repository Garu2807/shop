// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  sequelize,
  User,
  Product,
  Order,
  OrderProduct,
  Cart,
} = require('../models');
const authenticate = require('../middleware/authenticate'); // Мидлварь для аутентификации

// Маршрут для создания заказа
router.post('/create', authenticate, async (req, res) => {
  const userId = req.user.id; // Предполагается, что мидлварь добавляет объект пользователя в req.user
  const { shippingAddress, paymentMethod } = req.body;

  // Проверка обязательных полей
  if (!shippingAddress || !paymentMethod) {
    return res
      .status(400)
      .json({ message: 'Необходимы адрес доставки и метод оплаты.' });
  }

  // Начало транзакции
  const transaction = await sequelize.transaction();

  try {
    // Получаем все элементы корзины пользователя вместе с данными продуктов
    const cartItems = await Cart.findAll({
      where: { user_id: userId },
      include: [{ model: Product, as: 'Product' }],
      transaction,
      lock: true, // Блокируем строки для предотвращения изменений другими транзакциями
    });

    // Проверяем, пуста ли корзина
    if (cartItems.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Корзина пуста.' });
    }

    // Вычисляем общую сумму заказа
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.quantity * item.Product.price;
    });

    // Создаём новый заказ
    const order = await Order.create(
      {
        user_id: userId,
        date: new Date(),
        status: 'Pending',
        total_amount: totalAmount,
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
      },
      { transaction }
    );

    // Переносим товары из корзины в заказ и обновляем запасы
    for (const item of cartItems) {
      const product = await Product.findByPk(item.product_id, {
        transaction,
        lock: true,
      });

      // Проверяем наличие товара на складе
      if (product.stock < item.quantity) {
        throw new Error(`Недостаточно товара: ${product.name}`);
      }

      // Создаём запись в OrderProducts
      await OrderProduct.create(
        {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price, // Цена на момент заказа
        },
        { transaction }
      );

      // Обновляем запас товара
      product.stock -= item.quantity;
      await product.save({ transaction });
    }

    // Очищаем корзину пользователя
    await Cart.destroy({
      where: { user_id: userId },
      transaction,
    });

    // Фиксируем транзакцию
    await transaction.commit();

    // Отправляем ответ с деталями заказа
    const createdOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: Product,
          as: 'Products',
          through: {
            attributes: ['quantity', 'price'],
          },
        },
        {
          model: User,
          as: 'User',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.status(201).json({
      message: 'Заказ успешно создан.',
      order: createdOrder,
    });
  } catch (error) {
    // Откатываем транзакцию в случае ошибки
    await transaction.rollback();
    console.error('Ошибка при создании заказа:', error);
    return res.status(500).json({
      message: 'Произошла ошибка при создании заказа.',
      error: error.message,
    });
  }
});

module.exports = router;
