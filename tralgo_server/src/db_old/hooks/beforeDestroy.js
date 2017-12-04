const debug = require('debug');

module.exports = (sequelize) => {
  sequelize.addHook('beforeDestroy', (instance) => {
    debug('app:db:hooks')(`Destroying ${instance._modelOptions.name.singular}`);
  });
  sequelize.addHook('beforeBulkDestroy', (options) => {
    debug('app:db:hooks')(`Bulk destroying ${options.model.name}s`);
  });
};
