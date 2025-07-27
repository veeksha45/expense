
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testDB', 'root', 'veeksha', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
