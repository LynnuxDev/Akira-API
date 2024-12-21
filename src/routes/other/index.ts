import { Router } from 'express';
import request from './request';

const router = Router();

router.use('/request', request);

export default router;
