'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:          { type: Sequelize.STRING },
      googlePlaceId: { type: Sequelize.STRING },
      coordinates:   { type: Sequelize.ARRAY(Sequelize.DOUBLE) },
      zoom:          { type: Sequelize.INTEGER, },
      createdAt:     { type: Sequelize.DATE, allowNull: false },
      updatedAt:     { type: Sequelize.DATE, allowNull: false }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Places');
  }
};