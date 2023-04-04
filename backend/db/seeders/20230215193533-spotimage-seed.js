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
        url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2022/4/20/0/HUHH2022_Amazing%20Kitchens_Greenwich-CT-Estate-06.jpg.rend.hgtvcom.966.644.suffix/1650498253351.jpeg',
        spotId: 1,
        preview: false,
      },
      {
        url: 'https://st.hzcdn.com/simgs/pictures/bedrooms/loft-bedroom-bathroom-suite-pangaea-interior-design-portland-or-img~1dc17eca0e1dbe81_4-2408-1-f96d5b9.jpg',
        spotId: 1,
        preview: false,
      },
      {
        url: 'https://i.pinimg.com/736x/30/6d/7a/306d7af0ea3250d6390a773ffba68a4a--ensuite-bathrooms-open-plan-bathrooms.jpg',
        spotId: 1,
        preview: false,
      },
      {
        url: 'https://d3exkutavo4sli.cloudfront.net/wp-content/uploads/2014/08/bathroom-in-bedroom-2-1024x661.jpg',
        spotId: 1,
        preview: false,
      },
      {
        url: 'https://ca-times.brightspotcdn.com/dims4/default/eaf51d6/2147483647/strip/true/crop/4200x2519+0+0/resize/1200x720!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F0e%2F2d%2F03612a3b4690b9ba8f84693b43be%2Fimage-1.jpg',
        spotId: 2,
        preview: true,
      },
      {
        url: 'https://www.zingyhomes.com/projectImages/2017/01/16/Clipboard01.jpg',
        spotId: 2,
        preview: false,
      },
      {
        url: 'https://cdn.trendir.com/wp-content/uploads/2016/12/Dupli-Dos-by-Juma-Architects-900x592.jpg',
        spotId: 2,
        preview: false,
      },
      {
        url: 'https://d3exkutavo4sli.cloudfront.net/wp-content/uploads/2014/08/bathroom-in-bedroom.jpg',
        spotId: 2,
        preview: false,
      },
      {
        url: 'https://www.bestinteriordesigners.eu/wp-content/uploads/2022/11/Incredible-Open-Bathroom-Concept-for-Master-Bedroom-15.jpg',
        spotId: 2,
        preview: false,
      },
      {
        url: 'https://cdn.mos.cms.futurecdn.net/8ZNVyj4UamrmxzuuHNMub7.jpg',
        spotId: 3,
        preview: true,
      },
      {
        url: 'https://www.traveller.com.au/content/dam/images/h/1/4/o/e/l/image.related.articleLeadwide.620x349.h14ny5.png/1535520593139.jpg',
        spotId: 3,
        preview: false,
      },
      {
        url: 'https://arc-anglerfish-arc2-prod-bostonglobe.s3.amazonaws.com/public/KX7U6MTOZYI6LKIAELFR33Z5YU.jpg',
        spotId: 3,
        preview: false,
      },
      {
        url: 'https://www.digsdigs.com/photos/2018/05/02-a-boho-girlish-bedroom-with-a-free-standing-bathtub-next-to-the-bed-for-adding-a-luxurious-feel.jpg',
        spotId: 3,
        preview: false,
      },
      {
        url: 'https://www.jessannkirby.com/wp-content/uploads/2020/10/Ikea-Pax-Wardrobe-Samsung-Frame-TV-Jess-Ann-Kirby-1800038.jpg',
        spotId: 3,
        preview: false,
      },
      {
        url: 'https://i.ytimg.com/vi/KLwsKK8qfi0/maxresdefault.jpg',
        spotId: 4,
        preview: true,
      },
      {
        url: 'https://www.contemporist.com/wp-content/uploads/2015/01/bedbath_260115_01-800x674.jpg',
        spotId: 4,
        preview: false,
      },
      {
        url: 'https://cdn.trendir.com/wp-content/uploads/2016/12/Dupli-Dos-by-Juma-Architects-900x592.jpg',
        spotId: 4,
        preview: false,
      },
      {
        url: 'https://www.gardendesign.com/pictures/images/500x400Exact_46x0/dream-team-s-portland-garden_6/outdoor-fire-pit-with-seating-fall-fire-pit-proven-winners_17071.jpg',
        spotId: 4,
        preview: false,
      },
      {
        url: 'https://www.redfin.com/blog/wp-content/uploads/2020/05/3_Backyard-Oasis-Ideas.jpg',
        spotId: 4,
        preview: false,
      },
      {
        url: 'https://www.trulia.com/pictures/thumbs_4/zillowstatic/fp/46b5211a5c69ed53ab6011057413e8c6-full.jpg',
        spotId: 5,
        preview: true,
      },
      {
        url: 'https://www.securefenceandrail.com/wp-content/uploads/2015/12/backyard.jpg',
        spotId: 5,
        preview: false,
      },
      {
        url: 'https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/istock-498015683-f73dd7466de875ab56ea505c35da4467.jpg',
        spotId: 5,
        preview: false,
      },
      {
        url: 'https://www.redfin.com/blog/wp-content/uploads/2020/05/1_Backyard-Oasis-Ideas.jpg',
        spotId: 5,
        preview: false,
      },
      {
        url: 'https://paradiserestored.com/wp-content/uploads/2020/09/Chau_Property_2020_027.jpg',
        spotId: 5,
        preview: false,
      },
      {
        url: 'https://pic.le-cdn.com/thumbs/520x390/04/1/properties/Property-1f6c0000000006d500016153bb31-114650143.jpg',
        spotId: 6,
        preview: true,
      },
      {
        url: 'https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2008/4/24/0/scott-cohen-pool-spa.jpg.rend.hgtvcom.1280.960.suffix/1400942765145.jpeg',
        spotId: 6,
        preview: false,
      },
      {
        url: 'https://www.watersidepoolscapes.com/wp-content/uploads/2020/04/Watermark_garden-cove-ct-4121_0011.jpg',
        spotId: 6,
        preview: false,
      },
      {
        url: 'https://hips.hearstapps.com/hmg-prod/images/backyard-ideas-hbx1111106d-1646175829.jpg',
        spotId: 6,
        preview: false,
      },
      {
        url: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F39%2F2012%2F10%2F20222857%2F100046769.jpg',
        spotId: 6,
        preview: false,
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
