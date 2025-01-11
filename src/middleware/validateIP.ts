import { logger, getClientIP } from '../utils';
import { Request, Response, NextFunction } from 'express';

const allowedIPs = ['127.0.0.1', `${process.env.AKIRA_IP}`]; // TODO: get this list from a database.

/**
 * Check if user is a valid user.
 * @returns 403 Error if user isn't allowed to use path.
 */
export const validateIPMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
  const normalizedIP = getClientIP(req);

  logger.info('Normalized IP for validation:', normalizedIP);

  if (allowedIPs.includes(normalizedIP || '')) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};
