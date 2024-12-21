import { Router } from 'express';
import { rateLimiter } from '../../middleware/rateLimiter';
import { getRoleplayGif } from '@/controllers/akira/roleplay';

const router = Router();

router.get('/:input', rateLimiter, getRoleplayGif);

export default router;
