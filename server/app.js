const express = require('express');
const serverConfig = require('./config/serverConfig');
const router = require('./routes/index.routes');

const app = express();
const PORT = 4000;

// config
serverConfig(app);

// routing
const indexRouter = require('./routes/index.routes');

app.use('/', indexRouter);
try {
  app.listen(PORT, () => {
    console.log(`*** Server started at ${PORT} port ***`);
  });
} catch (error) {
  console.log(error.message);
}
