const express = require('express');

const router = express.Router();

//c api
const ProductsRouterApi = require('./api/products.routes');
const AuthRouterApi = require('./api/auth.routes');

router.use('/api/products', ProductsRouterApi);
router.use('/api/auth', AuthRouterApi);

module.exports = router;
