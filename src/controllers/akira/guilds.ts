import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { readGuildsFromFile, writeGuildsToFile } from '../../utils/akira/guilds';

export const getGuilds = (req: Request, res: Response) => {
  const guildsFilePath = path.resolve(__dirname, '../../../data/guilds.json');

  fs.readFile(guildsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read guilds data', error: err.message });
    }

    try {
      const guilds = JSON.parse(data);
      return res.json({ guilds });
    } catch (parseError: unknown) {
      if (parseError instanceof Error) {
        return res.status(500).json({ message: 'Failed to parse guilds data', error: parseError.message });
      } else {
        return res.status(500).json({ message: 'Unknown error occurred during JSON parsing' });
      }
    }
  });
};

/**
 * Updates/Adds a guild in the Featured guilds list.
 * TODO: Add this when working on akira GuildPosts.
 */
export const updateGuilds = (req: Request, res: Response) => {
  const body = req.body.body;
  const requestIP = req.headers['x-real-ip'] || req.ip || req.connection.remoteAddress;

  res.status(418).json({message: 'This will be added later.'})
};

/**
 * Remove a guild from the Featured guilds list.
 * TODO: Add this when working on akira GuildPosts.
 */
export const deleteGuild = (req: Request, res: Response) => {
  const body = req.body.body;
  const requestIP = req.headers['x-real-ip'] || req.ip || req.connection.remoteAddress;

  res.status(418).json({message: 'This will be added later.'})
};
