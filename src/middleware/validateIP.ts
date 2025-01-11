import { logger, getClientIP } from '../utils';
import { Request, Response, NextFunction } from 'express';

/**
 * Check if user is a valid user.
 * @returns 403 Error if user isn't allowed to use path.
 */
export const validateIPMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
  const normalizedIP = getClientIP(req);
  const allowedIPs = ['127.0.0.1', `${process.env.AKIRA_IP}`];

  if (allowedIPs.includes(normalizedIP || '')) {
    logger.info(`Request from ${normalizedIP} passed.`)
    next();
  } else {
    logger.info(`Request from ${normalizedIP} forbidden.`)
    res.status(403).json({ message: 'Forbidden' });
  }
};
