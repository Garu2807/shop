const express = require('express');
const router = express.Router();

//c api
const ProductsRouterApi = require('./api/products.routes');
const UsersRouterApi = require('./api/auth.routes');

router.use('/api/products', ProductsRouterApi);
router.use('/api/auth', UsersRouterApi);

module.exports = router;
