import { logger } from '@/utils';
import { Request, Response } from 'express';
import * as fs from 'fs';
import path from 'path';

const statsFilePath = path.resolve(__dirname, '../../../data/stats.json');

/**
 * Get request reads from stats.json and returns the data.
 */
export const readStatsFromFile = (req: Request, res: Response) => {
  fs.readFile(statsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read guilds data', error: err.message });
    }

    try {
      const stats = JSON.parse(data);
      return res.json({ stats });
    } catch (parseError: unknown) {
      if (parseError instanceof Error) {
        return res.status(500).json({ message: 'Failed to parse stats data', error: parseError.message });
      } else {
        return res.status(500).json({ message: 'Unknown error occurred during JSON parsing' });
      }
    }
  });
};

/**
 * Updates status data if valid json.
 */
export const updateStats = (req: Request, res: Response) => {
  const { members, servers, commands, uptime } = req.body;

  if (!validateStatsBody(req.body)) {
    res.status(400).json({
      message: 'Invalid request body. Expected structure: {"members": number, "servers": number, "commands": number, "uptime": string}',
    });
    return ;
  }

  const updatedStats = {
    members,
    servers,
    commands,
    uptime,
  };

  fs.writeFile(statsFilePath, JSON.stringify(updatedStats, null, 2), 'utf-8', (err) => {
    if (err) {
      logger.error('Error writing stats file:', err);
      res.status(500).json({ message: 'Failed to update stats', error: err.message });
      return;
    }

    res.json({ message: 'Stats updated successfully' });
    return;
  });
};

/**
 * Checks if body is valid.
 * @param body The body of the request.
 * @returns If params are valid.
 */
const validateStatsBody = (body: any) => {
  return (
    typeof body.members === 'number' &&
    typeof body.servers === 'number' &&
    typeof body.commands === 'number' &&
    typeof body.uptime === 'string'
  );
};