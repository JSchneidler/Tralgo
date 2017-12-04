'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    googlePlaceId: DataTypes.STRING,
    coordinates: DataTypes.ARRAY(DataTypes.DOUBLE),
    zoom: DataTypes.INTEGER,
  });

  Place.associate = (models) => {
    Place.hasMany(models.Point, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      }
    });
    Place.hasMany(models.Edge, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      }
    });
  };

  return Place;
};