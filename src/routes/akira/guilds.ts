import express from 'express';
import { Router } from 'express';
import { getGuilds, updateGuilds, deleteGuild } from '../../controllers/akira/guilds';

const router = Router();

router.get('/', getGuilds);
router.post('/', express.json(),  updateGuilds);
router.delete('/', deleteGuild);

export default router;
