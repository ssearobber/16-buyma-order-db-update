const Sequelize = require('sequelize');
const Order = require('./order');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Order = Order;

Order.init(sequelize);

module.exports = db;
