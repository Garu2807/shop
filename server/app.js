// require('@babel/register');
require('dotenv').config();
const PORT = process.env.PORT ?? 3010;
const express = require('express');
const app = express();
const serverConfig = require('./config/serverConfig');

//конфиг сервера
serverConfig(app);

//маршрутизация
const indexRouter = require('./routes/index.routes');
app.use('/', indexRouter);

//запуск сервера
app.listen(PORT, () => {
  console.log(`Наш прекрасный сервер разговаривает на порту ${PORT}`);
});
