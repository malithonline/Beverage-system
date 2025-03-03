import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus } from '../controllers/orderController.js';
import { protect, staffOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createOrder)
  .get(protect, staffOnly, getOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/status')
  .put(protect, staffOnly, updateOrderStatus);

export default router;