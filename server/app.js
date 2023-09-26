const express = require('express');
const serverConfig = require('./config/serverConfig');

const app = express();
const PORT = 5000;

// config
serverConfig(app);

// routing

try {
  app.listen(PORT, () => {
    console.log(`*** Server started at ${PORT} port ***`);
  });
} catch (error) {
  console.log(error.message);
}
