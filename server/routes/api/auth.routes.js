const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

router.post('/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ where: { email } });
    if (!name || !email || !password) {
      res.status(400).json({ message: 'ERROR' });
      return;
    }
    if (user) {
      res.status(400).json({ message: 'ERROR' });

      return;
    }
    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hash });
    req.session.userId = user.id;
    res.status(200).json({ message: 'REG SUCCESS' });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});

router.post('/authorization', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'ERROR' });
      return;
    }
    const user = await User.findOne({ where: { email } });
    let compare = false;
    if (user) {
      compare = await bcrypt.compare(password, user.password);
    }
    if (!compare) {
      res.status(400).json({
        message: 'неверный пароль!',
      });
      return;
    }
    req.session.userId = user.id;
    res.status(200).json({ message: 'SUCCESS' });
  } catch ({ message }) {
    res.status(500).json({ message });
  }
});
module.exports = router;
