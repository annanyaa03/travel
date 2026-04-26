import { Router } from 'express';
import { getAllDestinations, getDestinationById } from '../controllers/destinations.controller.js';

const router = Router();

console.log('--- Destinations Routes Loading ---');

// GET /api/destinations
router.get('/', getAllDestinations);

// GET /api/destinations/:id
router.get('/:id', getDestinationById);

export default router;
