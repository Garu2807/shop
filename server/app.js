const express = require('express');
const serverConfig = require('./config/serverConfig');
const router = require('./routes/index.routes');
const ProductsRouterApi = require('./routes/api/products.routes');

const app = express();
const PORT = 6000;

// config
serverConfig(app);

// routing
router.use('/api/products', ProductsRouterApi);
try {
  app.listen(PORT, () => {
    console.log(`*** Server started at ${PORT} port ***`);
  });
} catch (error) {
  console.log(error.message);
}
