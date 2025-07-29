import express from 'express';
import { createOrder, updateOrderStatus } from '../controllers/purchaseController.js';
import { authenticateToken } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/create-order', authenticateToken, createOrder);
router.post('/update-status', authenticateToken, updateOrderStatus);

export default router;
