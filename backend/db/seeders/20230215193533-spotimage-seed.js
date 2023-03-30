'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        url: 'https://photos.zillowstatic.com/fp/2c985a3dabbb57a7436d6e2fe3f8240a-p_e.jpg',
        spotId: 1,
        preview: true,
      },
      {
        url: 'https://ca-times.brightspotcdn.com/dims4/default/eaf51d6/2147483647/strip/true/crop/4200x2519+0+0/resize/1200x720!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F0e%2F2d%2F03612a3b4690b9ba8f84693b43be%2Fimage-1.jpg',
        spotId: 2,
        preview: true,
      },
      {
        url: 'https://cdn.mos.cms.futurecdn.net/8ZNVyj4UamrmxzuuHNMub7.jpg',
        spotId: 3,
        preview: true,
      },
      {
        url: 'https://i.ytimg.com/vi/KLwsKK8qfi0/maxresdefault.jpg',
        spotId: 4,
        preview: true,
      },
      {
        url: 'https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/46b5211a5c69ed53ab6011057413e8c6-full.jpg',
        spotId: 5,
        preview: true,
      },
      {
        url: 'https://pic.le-cdn.com/thumbs/520x390/04/1/properties/Property-1f6c0000000006d500016153bb31-114650143.jpg',
        spotId: 6,
        preview: true,
      },
      {
        url: 'https://static01.nyt.com/images/2020/01/27/realestate/27WYG-CA-slide-HWXH/27WYG-CA-slide-HWXH-superJumbo.jpg',
        spotId: 7,
        preview: true,
      },
      {
        url: 'https://tjh.com/wp-content/uploads/2021/07/SOCAL-BOOH.jpg',
        spotId: 8,
        preview: true,
      },
      {
        url: 'https://www.tollbrothers.com/blog/wp-content/uploads/2019/12/1-Alara-Calypso_Front-Elevation.jpg',
        spotId: 9,
        preview: true,
      },
      {
        url: 'https://ap.rdcpix.com/c24e81a0a097277bde52fc1f824e02b8l-b1117342834od-w480_h360_x2.jpg',
        spotId: 10,
        preview: true,
      },
      {
        url: 'https://ap.rdcpix.com/532001ff21ae110ead4b1cbb8461be40l-m1545551861od-w480_h360_x2.jpg',
        spotId: 11,
        preview: true,
      },
      {
        url: 'https://assets3.thrillist.com/v1/image/1524033/1000x666/flatten;crop;webp=auto;jpeg_quality=60.jpg',
        spotId: 12,
        preview: true,
      },
      {
        url: 'https://www.ajc.com/resizer/Vt3sBTze3kvgjBFq1TL5xfhCEBs=/fit-in/500x342/cloudfront-us-east-1.images.arcpublishing.com/ajc/ZICEOGRMGORKLOA2OF32DH32IA.jpg',
        spotId: 13,
        preview: true,
      },
      {
        url: 'https://i.ytimg.com/vi/lOIrRcHAEnE/maxresdefault.jpg',
        spotId: 14,
        preview: true,
      },
      {
        url: 'https://i.ytimg.com/vi/kIL4zMGwFUg/maxresdefault.jpg',
        spotId: 15,
        preview: true,
      },
      {
        url: 'https://cdn.tollbrothers.com/communities/13387/images/Windfaire-Lot-1-Rosebriar-SA-Basement-090619_CC_RET_1920.jpg',
        spotId: 16,
        preview: true,
      },
      {
        url: 'https://static.mansionglobal.com/production/media/article-images/26896ef856152f9d3a350e0f5ac7db48/large_2_90DuneRoadQuogue.jpg',
        spotId: 17,
        preview: true,
      },
      {
        url: 'https://hips.hearstapps.com/hmg-prod/images/imagereader-3-1550604839.jpg',
        spotId: 18,
        preview: true,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {}, {});
  }
};
