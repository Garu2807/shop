const express = require('express');
const { Product, Cart } = require('../../db/models');
const router = express.Router();
const { User } = require('../../db/models');

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  // console.log(`твой id ${userId}`); // Предполагая, что идентификатор пользователя хранится в сессии

  try {
    const userCart = await User.findByPk(userId, {
      include: {
        model: Product,
        through: { model: Cart, attributes: ['quantity'] }, // , attributes: ['quantity']
        as: 'Products',
      },
    });
    if (!userCart) {
      console.log('пусто');
    }
    // Преобразование структуры объекта userCart
    const transformedCart = userCart.Products.map(product => ({
      ...product.toJSON(),
      quantity: product.Cart.quantity
    }));

    console.log(transformedCart);
    res.json(transformedCart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.post('/', async (req, res) => {
  const userId = req.session.userId;
  const products_id = req.body.id;
  // console.log(userId, products_id);
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOrCreate({
      where: {
        users_id: userId,
        products_id: products_id,
      },
      quantity: quantity,
    });
    console.log(cart);
    res.json(cart);
  } catch ({ message }) {
    res.json({ message });
  }
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const users_id = req.session.userId; // Получение users_id из параметров запроса
  console.log(id, users_id);

  // Далее обрабатывайте удаление элемента из корзины с учетом users_id
  Cart.destroy({ where: { products_id: id, users_id: users_id } })
    .then((data) => (data ? res.json(id) : res.status(404).json(data)))
    .catch((error) => res.status(500).json(error));
});

router.put('/:id', async (req, res) => {
  const { id } = req.params; //Это id товара а не корзины!!!
  const usersId = req.session.userId;
  const { quantity } = req.body;
  try {
    // Получаем текущую запись в корзине
    const cartItem = await Cart.update(req.body, {
      where: { users_id: usersId, products_id: id },
    });
    console.log(cartItem);
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    cartItem.quantity = quantity;
    res.json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
