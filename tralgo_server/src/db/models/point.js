'use strict';
module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define('Point', {
    name: DataTypes.STRING,
    coordinates: DataTypes.ARRAY(DataTypes.DOUBLE),
    type: DataTypes.STRING,
    edges: DataTypes.ARRAY(DataTypes.STRING),
  });

  Point.associate = (models) => {
    Point.belongsTo(models.Place);
  }
  
  return Point;
};