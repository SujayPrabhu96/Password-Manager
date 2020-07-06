const Sequelize = require('sequelize');
const { host, username, password, dbname } = require('./config');
const db = {};

const sequelize = new Sequelize(dbname, username, password, {
    host: host,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;