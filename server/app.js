require('@babel/register');
require('dotenv').config();
const express = require('express');
const config = require('./config/serverConfig');
const { Sequelize } = require('sequelize');

const app = express();

const PORT = process.env.PORT || 4000;

const indexRouter = require('./routes/index.routes');

config(app);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Важно для подключения к базам данных, использующим самоподписанные сертификаты
    },
  },
});
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', indexRouter);

app.listen(PORT, () => {
  console.log(`Этот сервер умирает на ${PORT} порту`);
});
