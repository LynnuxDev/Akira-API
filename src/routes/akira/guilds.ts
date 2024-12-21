import express from 'express';
import { Router } from 'express';
import { rateLimiter, postRateLimiter } from '../../middleware/rateLimiter';
import { getGuilds, updateGuilds, deleteGuild } from '../../controllers/akira/guilds';

const router = Router();

router.get('/', rateLimiter, getGuilds);
router.post('/', postRateLimiter, express.json(),  updateGuilds);
router.delete('/', rateLimiter, deleteGuild);

export default router;
