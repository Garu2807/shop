const express = require('express');
const { Product, Cart } = require('../../db/models');
const router = express.Router();
const { User } = require('../../db/models');

router.get('/', async (req, res) => {
  const userId = req.session.userId;

  try {
    const userCart = await User.findByPk(userId, {
      include: {
        model: Product,
        through: { model: Cart, attributes: ['quantity'] },
        as: 'Products',
      },
    });

    if (!userCart) {
      return res
        .status(404)
        .json({ error: 'Cart is empty', cart: [], totalQuantity: 0 });
    }

    const transformedCart = userCart.Products.map((product) => ({
      ...product.toJSON(),
      quantity: product.Cart.quantity,
    }));

    const totalQuantity = transformedCart.reduce(
      (total, product) => total + product.quantity,
      0
    );

    res.json({ cart: transformedCart, totalQuantity });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => {
  const userId = req.session.userId;
  const { id: productId, quantity } = req.body;

  try {
    // Проверяем, есть ли товар уже в корзине
    const existingCartItem = await Cart.findOne({
      where: {
        users_id: userId,
        products_id: productId,
      },
    });

    if (existingCartItem) {
      // Если товар уже в корзине, увеличиваем его количество
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      // Если товара нет в корзине, создаем новую запись
      await Cart.create({
        users_id: userId,
        products_id: productId,
        quantity: quantity,
      });
    }

    // Получаем обновленное количество товаров в корзине
    const userCart = await User.findByPk(userId, {
      include: {
        model: Product,
        through: { model: Cart, attributes: ['quantity'] },
        as: 'Products',
      },
    });

    const totalQuantity = userCart.Products.reduce(
      (total, product) => total + product.Cart.quantity,
      0
    );

    res.json({ totalQuantity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
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
  const { id } = req.params; // ID продукта
  const usersId = req.session.userId;
  const { quantity } = req.body;

  try {
    const [updatedRows] = await Cart.update(
      { quantity },
      { where: { users_id: usersId, products_id: id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    const userCart = await User.findByPk(usersId, {
      include: {
        model: Product,
        through: { model: Cart, attributes: ['quantity'] },
        as: 'Products',
      },
    });

    const totalQuantity = userCart.Products.reduce(
      (total, product) => total + product.Cart.quantity,
      0
    );

    res.json({ message: 'Quantity updated', totalQuantity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/quantity', async (req, res) => {
  const userId = req.session.userId;

  try {
    const userCart = await User.findByPk(userId, {
      include: {
        model: Product,
        through: { model: Cart, attributes: ['quantity'] },
        as: 'Products',
      },
    });

    if (!userCart) {
      return res.status(404).json({ totalQuantity: 0 });
    }

    const totalQuantity = userCart.Products.reduce(
      (total, product) => total + product.Cart.quantity,
      0
    );

    res.json({ totalQuantity });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
