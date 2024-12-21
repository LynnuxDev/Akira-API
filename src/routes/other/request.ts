import { Router } from 'express';
import { rateLimiter } from '../../middleware/rateLimiter';
import { proxyRequest } from '../../controllers/other/request';

const router = Router();

router.get('/', rateLimiter, proxyRequest);

export default router;
