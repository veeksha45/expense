const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db-connection');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });
});
