import { Router } from 'express';
import { test } from '../../controllers/other/test';

const router = Router();

router.get('/', test);

export default router;
