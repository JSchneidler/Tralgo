'use strict';

const NODE_STRING_REGEX = /^[A-Za-z]/;

module.exports = (sequelize, DataTypes) => {
  const Edge = sequelize.define('Edge', {
    name: DataTypes.STRING,
    distance: DataTypes.INTEGER,
    elevation_gain: DataTypes.INTEGER,
    coordinates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      get() {
        let result = [];
        let coordinates = this.getDataValue('coordinates');
        for (let i = 0; i < coordinates.length; i++) {
          if (!isNodeString(coordinates[i])) result.push([coordinates[i], coordinates[++i]]);
          else result.push(coordinates[i]);
        }
        return result;
      },
      set(newCoordinates) {
        let result = [];
        for (let i = 0; i < newCoordinates.length; i++) {
          if (Array.isArray(newCoordinates[i])) newCoordinates[i].forEach(coordinate => result.push(coordinate));
          else result.push(newCoordinates[i]);
        }
        this.setDataValue('coordinates', result);
      },
    },
    points: DataTypes.ARRAY(DataTypes.STRING),
  });

  Edge.associate = (models) => {
    Edge.belongsTo(models.Place);
  };

  return Edge;
};

function isNodeString(value) {
  return value.match(NODE_STRING_REGEX);
}