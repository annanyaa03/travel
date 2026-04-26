import express from 'express';
import * as hotelsController from '../controllers/hotels.controller.js';

const router = express.Router();

router.get('/search', hotelsController.searchHotels);

export default router;
