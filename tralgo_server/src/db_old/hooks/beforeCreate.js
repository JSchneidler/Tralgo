const debug = require('debug');

module.exports = (sequelize) => {
  sequelize.addHook('beforeCreate', (instance) => {
    debug('app:db:hooks')(`Creating ${instance._modelOptions.name.singular}`);
  });
  sequelize.addHook('beforeBulkCreate', (instances, options) => {
    debug('app:db:hooks')(`Bulk creating ${instances.length} ${options.model.name}s`);
  });
};
