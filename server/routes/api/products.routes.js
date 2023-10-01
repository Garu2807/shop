const express = require('express');

const router = express.Router();
const { Product } = require('../../db/models');
// Получаем все товары
router.get('/', (req, res) => {
  Product.findAll()
    .then((allProducts) => res.json({ products: allProducts }))
    .catch((error) => res.status(500).json(error));
});
// Добаление товара (только администратор)
router.post('/', async (req, res) => {
  const { name, img, brand, category, sex, size, price } = req.body;
  try {
    const product = await Product.create({
      name,
      img,
      brand,
      category,
      sex,
      size,
      price,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Удаление
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: { id },
    });
    if (product) {
      await product.destroy();
      res.json({ message: true });
    } else {
      res.json({ message: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
