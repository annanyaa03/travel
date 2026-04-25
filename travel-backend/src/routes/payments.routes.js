import express from 'express';
import * as paymentController from '../controllers/payments.controller.js';
import validate from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import { paymentLimiter } from '../middleware/rateLimiter.middleware.js';
import * as paymentSchema from '../schemas/payment.schema.js';

const router = express.Router();

// Webhook must be before protect middleware and needs raw body
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

router.use(protect);

router.post('/create-checkout', paymentLimiter, validate(paymentSchema.createCheckoutSchema), paymentController.createCheckoutSession);
router.post('/refund', validate(paymentSchema.refundSchema), paymentController.requestRefund);

export default router;
