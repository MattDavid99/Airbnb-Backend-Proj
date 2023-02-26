'use strict';
const {
  Model, Sequelize
} = require('sequelize');

let schema;
if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.Review, { foreignKey: 'spotId' })
      Spot.hasMany(models.Booking, { foreignKey: 'spotId' })
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId' })
      Spot.belongsTo(models.User, { as: 'Owner', foreignKey: 'ownerId' })

    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Spot',

    scopes: {
      getAllSpots() {
        // const {User,Spot,Booking,SpotImage,Review,ReviewImage,} = require('../models');
        return {
          attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [
              Sequelize.literal(
                `(SELECT ROUND(AVG(stars), 1) FROM ${schema ? `"${schema}"."Reviews"` : 'Reviews'
                } WHERE "Reviews"."spotId" = "Spot"."id")`
              ),
              'avgRating',
            ],
            [
              Sequelize.literal(
                `(SELECT url FROM ${schema ? `"${schema}"."SpotImages"` : 'SpotImages'
                } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`
              ),
              'previewImage',
            ],
          ],
        };
      },
    }
  });
  return Spot;
};
