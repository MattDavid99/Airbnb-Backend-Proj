'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        url: 'https://i2-prod.mirror.co.uk/incoming/article20396272.ece/ALTERNATES/s615/1_cl_HMB_02102019house_24JPG.jpg',
        reviewId: 1,
      },
      {
        url: 'https://www.hollywoodreporter.com/wp-content/uploads/2013/07/trailer_park_boys_l.jpg',
        reviewId: 2,
      },
      {
        url: 'https://spotlightnews.com/wp-content/uploads/2022/06/trailer-park-web-5029.jpg',
        reviewId: 3,
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
