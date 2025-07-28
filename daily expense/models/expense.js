const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db-connection');
const User = require('./users');

const Expense = sequelize.define('Expense', {
  amount: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.STRING },
  category: { type: DataTypes.STRING }
});

User.hasMany(Expense);
Expense.belongsTo(User);

module.exports = Expense;
