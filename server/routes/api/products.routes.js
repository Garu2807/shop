const express = require('express');

const router = express.Router();
const { Product, User, Cart } = require('../../db/models');
const { where } = require('sequelize');
// Получаем все товары
router.get('/', (req, res) => {
  Product.findAll()
    .then((allProducts) => res.json({ products: allProducts }))
    .catch((error) => res.status(500).json(error));
});
// Добаление товара (только администратор)
router.post('/', async (req, res) => {
  if (req.session.userId) {
    const { name, img, brand, category, sex, size, price } = req.body;
    const user = await User.findOne({
      where: { id: req.session.userId, isAdmin: true },
    });
    if (user) {
      try {
        const newProduct = await Product.create({
          name,
          img,
          brand,
          category,
          sex,
          size,
          price,
        });
        res.json(newProduct.dataVal);
        console.log(newProduct.dataValues);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
});

// Удаление
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Ищем продукт по ID
    const product = await Product.findOne({
      where: { id },
    });

    if (!product) {
      // Если продукт не найден, возвращаем 404
      return res
        .status(404)
        .json({ message: false, error: 'Product not found' });
    }

    // Удаляем все записи из Carts, связанные с этим продуктом
    await Cart.destroy({
      where: { id },
    });

    // Удаляем продукт
    await product.destroy();

    // Отправляем успешный ответ
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    // В случае ошибки отправляем статус 500
    res
      .status(500)
      .json({ message: 'Failed to delete product', error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  Product.update(req.body, { where: { id }, returning: true })
    .then((updatedProduct) => res.json(updatedProduct))
    .catch((error) => res.status(500).json(error));
});
module.exports = router;
