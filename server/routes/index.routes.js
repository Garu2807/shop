const express = require('express');

const router = express.Router();

//c api
const ProductsRouterApi = require('./api/products.routes');
const AuthRouterApi = require('./api/auth.routes');
const UsersRouterApi = require('./api/users.routes');

router.use('/api/products', ProductsRouterApi);
router.use('/api/auth', AuthRouterApi);
router.use('/api/users', UsersRouterApi);

module.exports = router;
