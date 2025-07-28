const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db-connection');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/users.js');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));




sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Secure server running on http://localhost:3000');
  });
});
