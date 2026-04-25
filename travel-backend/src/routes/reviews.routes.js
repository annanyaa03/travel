import express from 'express';
import * as reviewController from '../controllers/reviews.controller.js';
import validate from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import * as reviewSchema from '../schemas/review.schema.js';

const router = express.Router();

router.get('/destination/:id', reviewController.getDestinationReviews);

router.use(protect);

router.post('/', validate(reviewSchema.createReviewSchema), reviewController.createReview);
router.post('/:id/helpful', reviewController.markReviewHelpful);
router.delete('/:id', reviewController.deleteReview);

export default router;
