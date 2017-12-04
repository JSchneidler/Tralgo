const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const debug = require('debug');

const MODEL_PATH = path.join(__dirname, './models');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

function DB() {
	const db = {};
	let sequelize;
	if (config.use_env_variable) {
		sequelize = new Sequelize(process.env[config.use_env_variable]);
	} else {
		sequelize = new Sequelize(config.database, config.username, config.password, config);
	}
	
	// Confirm DB connection
	sequelize.authenticate()
		.then(() => debug('app:db')(`Connected to ${config.database}`))
		.catch((err) => {
			throw err;
		});
	
	// Register models
	fs
		.readdirSync(MODEL_PATH)
		.filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
		.forEach((file) => {
			const model = sequelize.import(path.join(MODEL_PATH, file));
			db[model.name] = model;
		});
	
	// Register model associations
	Object.keys(db).forEach((modelName) => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	});
	
	// Sync models with DB
	sequelize.sync({
		logging: config.logging ? debug('app:sequelize') : false,
	});
	
	// Register hooks
	require('./hooks')(sequelize); // eslint-disable-line global-require
	
	db.sequelize = sequelize;
	db.Sequelize = Sequelize;
	
	return db;
}

module.exports = new DB();
