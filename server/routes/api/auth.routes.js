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
    // console.log('User created:', user);
    res.status(200).json(user);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/authorization', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const compare = await bcrypt.compare(password, user.password);
    if (!email || !password) {
      res.json({ message: 'Заполните все поля' });
      return;
    }
    if (!user || !compare) {
      res.json({ message: 'Такого юзера не существует или пароль неверный' });
      return;
    }
    req.session.userId = user.id;
    res.json(user);
  } catch ({ message }) {
    res.json({ message });
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
      res.json(user);
    }
    res.end();
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
