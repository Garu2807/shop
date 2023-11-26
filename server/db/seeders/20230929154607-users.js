'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userArr = [
      {
        name: 'Gagik',
        email: 'arutyunyangagik@gmail.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        name: 'G',
        email: 'a@g.com',
        password: await bcrypt.hash('123', 10),
      },
    ];
    const users = userArr.map((el) => ({
      ...el,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};
