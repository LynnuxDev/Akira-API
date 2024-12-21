import express from 'express';
import { Router } from 'express';
import { rateLimiter, postRateLimiter } from '../../middleware/rateLimiter';
import { readStatsFromFile, updateStats } from '../../controllers/akira/stats';

const router = Router();

router.get('/', rateLimiter, readStatsFromFile);
router.post('/', postRateLimiter, express.json(), updateStats);

export default router;
