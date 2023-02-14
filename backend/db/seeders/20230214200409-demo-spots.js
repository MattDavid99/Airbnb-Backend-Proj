'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
        lat: 37.79,
        lng: 22.94,
        name: 'Golden Gate Park',
        description: 'A beautiful park in the heart of San Francisco',
        price: 10.00,
      },
      {
        ownerId: 20,
        address: '456 Market St',
        city: 'San Francisco',
        state: 'California',
        country: 'USA',
        lat: 37.12,
        lng: 22.71,
        name: 'Ferry Building',
        description: 'A historic building with shops and restaurants',
        price: 15.00,
      },
      {
        ownerId: 20,
        address: '1943 Timberline Dr',
        city: 'Naples',
        state: 'Florida',
        country: 'USA',
        lat: 26.49,
        lng: 81.15,
        name: 'House',
        description: 'A house',
        price: 25.00,
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