'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-09-28',
        endDate: '2023-09-30',
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2023-02-28',
        endDate: '2023-03-01',
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2023-05-15',
        endDate: '2023-05-17',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2023-09-28', '2023-02-28', '2023-05-15'] }
    }, {});
  }
};
