import { v4 as uuidv4 } from 'uuid';
import Order from '../models/order.js';
import cashfree from 'cashfree-pg'; // make sure it's installed
import User from '../models/user.js';

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = uuidv4();

    await Order.create({ orderId, status: 'PENDING', UserId: userId });

    const orderRequest = {
      orderId: orderId,
      orderAmount: 99.0,
      orderCurrency: 'INR',
      customerPhone: '9999999999',
      customerEmail: 'user@example.com',
      customerName: 'User',
    };

    const response = await cashfree.PGCreateOrder(orderRequest);

    res.status(201).json({ orderId, paymentSessionId: response.payment_session_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Order creation failed' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.body;

  try {
    const response = await cashfree.PGOrderFetchPayments(orderId);
    const status = response?.order_status;

    if (status === 'PAID') {
      await Order.update({ status: 'SUCCESSFUL' }, { where: { orderId } });
      await User.update({ isPremiumUser: true }, { where: { id: req.user.id } });
    } else {
      await Order.update({ status: 'FAILED' }, { where: { orderId } });
    }

    res.status(200).json({ message: `Order ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Status update failed' });
  }
};
