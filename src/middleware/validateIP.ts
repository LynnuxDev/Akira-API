import { logger } from '../utils';
import { Request, Response, NextFunction } from 'express';

const allowedIPs = ['127.0.0.1', `${process.env.AKIRA_IP}`]; // TODO: get this list from a database.

/**
 * Check if user is a valid user.
 * @returns 403 Error if user isn't allowed to use path.
 */
export const validateIPMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
  const requestIP = req.headers['x-real-ip'] ||
    (typeof req.headers['x-forwarded-for'] === 'string' ? req.headers['x-forwarded-for'].split(',')[0] : '') ||
    req.ip ||
    req.connection.remoteAddress;

  let normalizedIP = Array.isArray(requestIP) ? requestIP.pop() : requestIP;

  logger.info('Request IP:', requestIP);
  logger.info('Normalized IP:', normalizedIP);

  if (normalizedIP && normalizedIP.includes(':')) {
    normalizedIP = normalizedIP.split(':')[0];
  }

  if (allowedIPs.includes(normalizedIP || '')) {
    next();
    return;
  } else {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
};
