const Expense = require('../models/expense');
const User = require('../models/users');

exports.addExpense = async (req, res) => {
  const { userId, amount, description, category } = req.body;
  try {
    const expense = await Expense.create({ amount, description, category, UserId: userId });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error adding expense', error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  const { userId } = req.query;
  try {
    const expenses = await Expense.findAll({ where: { UserId: userId } });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
};
