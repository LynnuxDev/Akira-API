import { Router } from 'express';
import { rateLimiter } from '../../middleware/rateLimiter';
import { proxyRequest } from '../../controllers/other/request';

const router = Router();

router.get('/',
  (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  },
  rateLimiter,
  proxyRequest);

export default router;
