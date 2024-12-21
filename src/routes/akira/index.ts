import { Router } from 'express';
import guildsRoutes from './guilds';
import statsRoutes from './stats';
import roleplayRoutes from './roleplay';

const router = Router();

router.use('/guilds', guildsRoutes);
router.use('/stats', statsRoutes);
router.use('/roleplay', roleplayRoutes);

export default router;
