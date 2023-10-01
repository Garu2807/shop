const express = require('express');

const router = express.Router();
const { Product } = require('../../db/models');

router.get('/', (req, res) => {
  Product.findAll()
    .then((allProducts) => res.json({ products: allProducts }))
    .catch((error) => res.status(500).json(error));
});

module.exports = router;
