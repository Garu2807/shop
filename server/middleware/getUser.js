const { User } = require('../db/models');

async function getUser(req, res, next) {
  if (req.session.userId) {
    const user = await User.findOne({ where: { id: req.session.userId } });

    if (user) {
      res.locals.user = { id: user.id, name: user.name };
    } else {
      console.warn('User not found for userId:', req.session.userId);
    }
  }

  next();
}

module.exports = getUser;
