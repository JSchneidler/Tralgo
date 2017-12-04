module.exports = (sequelize, DataTypes) => {
  const Point = sequelize.define('Point', {
    name: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY,
  });
  Point.name = 'Point';
  
  Point.associate = (models) => {
    Point.belongsTo(models.Place, {
      onDelete: 'CASCADE',
    });
  };
  
  return Point;
};
