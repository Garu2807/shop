const express = require('express');
const { UserProducts, Product, Cart } = require('../../db/models');
const router = express.Router();
const { User } = require('../../db/models');

router.get('/', (req, res) => {
  const userId = req.session.userId;
  console.log(`твой id ${userId}`); // Предполагая, что идентификатор пользователя хранится в сессии
  Cart.findAll({
    where: console.log({ users_id: userId }),
    include: [{ model: Product }],
  })
    .then((userCart) => {
      res.json({ products: userCart });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});
router.post('/', async (req, res) => {
  // const userId = req.session.userId;
  try {
    const { users_id, products_id } = req.body;
    const cart = await Cart.create({
      users_id: 2,
      products_id: 2,
    });
    res.json(cart);
    console.log(res);
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
