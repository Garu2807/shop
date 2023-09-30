const express = require('express');
const router = express.Router();

//c api
const ProductsRouterApi = require('./api/products.routes');
router.use('/api/products', ProductsRouterApi);

module.exports = router;
