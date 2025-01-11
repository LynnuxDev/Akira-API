import { logger, getClientIP } from '../utils';
import { Request, Response, NextFunction } from 'express';


/**
 * Check if user is a valid user.
 * @returns 403 Error if user isn't allowed to use path.
 */
export const validateIPMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
  const normalizedIP = getClientIP(req);
  const allowedIPs = ['127.0.0.1', `${process.env.AKIRA_IP}`];

  console.log('Normalized IP for validation:', normalizedIP);
  console.log('Allowed IPs:', allowedIPs);
  console.log('AKIRA_IP from env:', process.env.AKIRA_IP);

  if (allowedIPs.includes(normalizedIP || '')) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};
