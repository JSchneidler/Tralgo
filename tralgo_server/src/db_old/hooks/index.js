module.exports = (sequelize) => {
 [
   'beforeCreate',
   'beforeDestroy',
   //'beforeUpdate',
 ].forEach((hook) => {
   require(`./${hook}`)(sequelize); // eslint-disable-line global-require
 });
};
