'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: 'Great Place!',
        stars: 4.5
      },
      {
        userId: 1,
        spotId: 4,
        review: 'The interior is tastefully decorated with a blend of modern and traditional elements',
        stars: 4.0
      },
      {
        userId: 1,
        spotId: 5,
        review: 'The interior is tastefully decorated with a blend of modern and traditional elements',
        stars: 4.0
      },
      {
        userId: 1,
        spotId: 6,
        review: 'The interior is tastefully decorated with a blend of modern and traditional elements',
        stars: 4.0
      },
      {
        userId: 1,
        spotId: 7,
        review: 'The interior is tastefully decorated with a blend of modern and traditional elements',
        stars: 4.0
      },
      {
        userId: 1,
        spotId: 8,
        review: 'The interior is tastefully decorated with a blend of modern and traditional elements',
        stars: 4.0
      },
      {
        userId: 1,
        spotId: 9,
        review: 'The interior is tastefully decorated with a blend of modern and traditional elements',
        stars: 4.0
      },
      {
        userId: 1,
        spotId: 10,
        review: 'The interior is tastefully decorated with a blend of modern and traditional elements',
        stars: 4.0
      },
      {
        userId: 2,
        spotId: 2,
        review: 'Beautiful Place!',
        stars: 3.0
      },
      {
        userId: 3,
        spotId: 3,
        review: 'Alright Place',
        stars: 3.5
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
