const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.post('/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Заполните все поля' });
      return;
    }
    if (user) {
      res.status(400).json({ message: 'Такой емайл уже занят' });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hash });
    req.session.userId = user.id;
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/authorization', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка наличия email и password
    if (!email || !password) {
      return res.status(400).json({ message: 'Заполните все поля' });
    }

    // Поиск пользователя по email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log(true);
      return res
        .status(401)
        .json({ message: 'Такого пользователя не существует' });
    }

    // Сравнение паролей
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    // Установка сессии и ответ с данными пользователя
    req.session.userId = user.id;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Произошла ошибка на сервере' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Ошибка при удалении сессии' });
    }

    res
      .clearCookie('user_sid') // серверное удаление куки по имени
      .redirect('/');
  });
});

router.get('/check', async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await User.findOne({ where: { id: req.session.userId } });
      console.log(user.isAdmin);
      res.json(user);
    }
    res.end();
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
