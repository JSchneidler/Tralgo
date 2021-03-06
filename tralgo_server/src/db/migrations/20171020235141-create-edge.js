'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Edges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:           { type: Sequelize.STRING },
      distance:       { type: Sequelize.INTEGER },
      elevation_gain: { type: Sequelize.INTEGER },
      coordinates:    { type: Sequelize.ARRAY(Sequelize.STRING) },
      points:         { type: Sequelize.ARRAY(Sequelize.STRING) },
      createdAt:      { type: Sequelize.DATE, allowNull: false },
      updatedAt:      { type: Sequelize.DATE, allowNull: false },
      PlaceId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Places', // Name of the table, not the model? (Very misleading)
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Edges');
  }
};