'use strict';

const { Product } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await Product.bulkCreate([
      {
        name: 'Jordan Retro OG',
        brand: 'Nike',
        category: 'Shoes',
        img: 'https://sneakernews.com/wp-content/uploads/2020/07/Air-Jordan-1-Retro-High-OG-W-Satin-Snakeskin-CD0461-601-1.jpg?w=1140',
        size: '40',
        price: 10000,
        sex: 'M',
      },
      {
        name: 'Куртка бомбер MA-1',
        brand: 'Alpha Industries',
        category: 'Outerwear',
        img: 'https://chiefandsheriff.ru/media/130/130374.jpg',
        size: 'S',
        price: 15000,
        sex: 'M',
      },
      {
        name: 'Мужские брюки Cargo Jogging',
        brand: 'Stone Island',
        category: 'Trousers',
        img: 'https://img.brandshop.ru/cache/products/m/muzhskie-bryuki-stone-island-cargo-jogging-black-0_1104x1104.jpg',
        size: 'S',
        price: 20000,
        sex: 'M',
      },
    ]);
  },

  async down() {
    await Product.destroy();
  },
};
