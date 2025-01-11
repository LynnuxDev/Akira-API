import { logger } from '../utils';
import { Request, Response, NextFunction } from 'express';

const allowedIPs = ['127.0.0.1', `${process.env.AKIRA_IP}`]; // TODO: get this list from a database.

/**
 * Check if user is a valid user.
 * @returns 403 Error if user isn't allowed to use path.
 */
export const validateIPMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
  // Get the request IP from headers or connection
  const requestIP = req.headers['x-real-ip'] ||
    (typeof req.headers['x-forwarded-for'] === 'string' ? req.headers['x-forwarded-for'].split(',')[0] : '') ||
    req.ip ||
    req.connection.remoteAddress;

  // Log the raw requestIP for debugging
  logger.info('Raw Request IP:', requestIP);

  // Handle case where requestIP might be an array (e.g., 'x-forwarded-for' can be a comma-separated list)
  let normalizedIP = Array.isArray(requestIP) ? requestIP.pop() : requestIP;

  // Log the initial normalizedIP value
  logger.info('Initial Normalized IP:', normalizedIP);

  // If there is a port in the IP (e.g., 192.145.39.146:3000), remove it
  if (normalizedIP && normalizedIP.includes(':')) {
    normalizedIP = normalizedIP.split(':')[0];
  }

  // Log the normalized IP after removing the port
  logger.info('Final Normalized IP:', normalizedIP);

  // Check if the normalizedIP is allowed
  if (allowedIPs.includes(normalizedIP || '')) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};
