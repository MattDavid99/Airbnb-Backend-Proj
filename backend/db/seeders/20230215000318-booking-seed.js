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
        startDate: '01-25-2023',
        endDate: '01-27-2023',
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '02-28-2023',
        endDate: '03-01-2023',
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '03-15-2023',
        endDate: '03-17-2023',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['01-25-2023', '02-28-2023', '03-15-2023'] }
    }, {});
  }
};
