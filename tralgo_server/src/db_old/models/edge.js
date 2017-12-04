module.exports = (sequelize, DataTypes) => {
  const Edge = sequelize.define('Edge', {
    name: DataTypes.STRING,
    geometry: DataTypes.GEOMETRY,
  });
  Edge.name = 'Edge';
  
  Edge.associate = (models) => {
    Edge.belongsTo(models.Place, {
      onDelete: 'CASCADE',
    });
  };
  
  return Edge;
};
