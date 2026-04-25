import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller.js';
import validate from '../middleware/validate.middleware.js';
import { protect } from '../middleware/auth.middleware.js';
import * as wishlistSchema from '../schemas/wishlist.schema.js';

const router = express.Router();

router.use(protect);

router.get('/', wishlistController.getMyWishlist);
router.post('/', validate(wishlistSchema.addToWishlistSchema), wishlistController.addToWishlist);
router.delete('/:destinationId', validate(wishlistSchema.removeFromWishlistSchema), wishlistController.removeFromWishlist);
router.get('/check/:id', wishlistController.checkWishlistStatus);

export default router;
