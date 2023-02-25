'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User, { foreignKey: 'userId' })
      Review.belongsTo(models.Spot, { foreignKey: 'spotId' })
      Review.hasMany(models.ReviewImage, { foreignKey: 'reviewId' })
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    spotId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    review: {
      type: DataTypes.STRING,
    },
    stars: {
      type: DataTypes.DECIMAL,
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
