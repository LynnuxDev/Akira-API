import { Router } from 'express';
import { getRoleplayGif } from '../../controllers/akira/roleplay';

const router = Router();

router.get('/:input', getRoleplayGif);

export default router;
