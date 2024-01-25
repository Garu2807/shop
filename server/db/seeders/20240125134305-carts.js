'use strict';
const { Cart } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await Cart.bulkCreate([
      {
        users_id: 2,
        products_id: 1,
      },
    ]);
  },

  async down() {
    await Cart.destroy();
  },
};
