module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    googlePlaceId: DataTypes.STRING,
  });
  Place.name = 'Place';
  
  Place.associate = (models) => {
    Place.hasMany(models.Point, {
      onDelete: 'CASCADE',
    });
  };
  
  return Place;
};
