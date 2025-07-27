
const express = require('express');
const sequelize = require('./utils/db-connection');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
});
