// models/order.js
import { DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import User from './user.js'; // assuming user model is already defined

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  paymentId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PENDING', // values: PENDING | SUCCESSFUL | FAILED
  }
});

// Relationship: One User has many Orders
User.hasMany(Order);
Order.belongsTo(User);

export default Order;
