import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';
import { protect, staffOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, staffOnly, createProduct);

router.route('/:id')
  .get(getProductById);

export default router;