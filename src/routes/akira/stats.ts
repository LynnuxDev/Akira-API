import express from 'express';
import { Router } from 'express';
import { readStatsFromFile, updateStats } from '../../controllers/akira/stats';

const router = Router();

router.get('/', readStatsFromFile);
router.post('/', express.json(), updateStats);

export default router;
