const debug = require('debug');

module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'tralgo_dev',
    host: 'localhost',
    dialect: 'postgres',
    logging: debug('app:sequelize:core'),
  },
  test: {
    username: 'postgres',
    password: 'password',
    database: 'tralgo_test',
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: 'postgres',
    password: 'password',
    database: 'tralgo_prod',
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
  }
};