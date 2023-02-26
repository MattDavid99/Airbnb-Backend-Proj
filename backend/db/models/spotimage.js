'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * hello
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId' })
    }
  }
  SpotImage.init({
    url: {
      type: DataTypes.STRING
    },
    spotId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      allowNull: false
    },
    preview: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
