import express from 'express';
import { processPayment } from '../controllers/paymentController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.post('/payment', checkAuth, processPayment);

export default router;
