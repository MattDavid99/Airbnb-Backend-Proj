'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [

      {
        ownerId: 20,
        address: '123 Main St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Golden Gate Park',
        description: 'A beautiful park in the heart of San Francisco',
        price: 10.00,
      },
      {
        ownerId: 21,
        address: '456 Market St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.7912,
        lng: -122.3971,
        name: 'Ferry Building',
        description: 'A historic building with shops and restaurants',
        price: 15.00,
      },
      {
        ownerId: 22,
        address: '1943 Timberline Dr',
        city: 'Naples',
        state: 'Florida',
        country: 'USA',
        lat: 26.23439,
        lng: -81.77915,
        name: 'House',
        description: 'A house',
        price: 125.00,
      }

    ], {});

  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Main St', '456 Market St', '1943 Timberline Dr'] }
    }, {});
  }
};
