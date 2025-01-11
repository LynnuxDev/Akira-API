import { Router } from 'express';
import request from './request';
import test from './test';

const router = Router();

router.use('/request', request);
router.use('/test', test);

export default router;
