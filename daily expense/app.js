const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./utils/db-connection');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/users');

const expenseRoutes = require('./routes/expenseRoutes');
const Expense = require('./models/expense');

app.use('/api/expenses', expenseRoutes);


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running at http://localhost:3000'));
}).catch(err => console.log('DB error:', err));
