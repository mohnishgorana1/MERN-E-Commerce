import express from 'express';
import { createPaymentIntent } from '../controllers/payment.controller.js';

const router = express.Router();

// Route to create a PaymentIntent
router.post('/create-payment-intent', createPaymentIntent);

export default router;