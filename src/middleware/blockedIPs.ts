import { Request, Response, NextFunction } from 'express';
const blockedIPs = ['35.216.172.135', '111.222.333.4']; // TODO: get this list from a database.

/**
 * Middleware checks if user is not blocked.
 * @returns 403 error if user is blocked.
 */
export const blockedIPMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestIP = req.headers['x-real-ip'] || req.ip || req.connection.remoteAddress;
  const normalizedIP = Array.isArray(requestIP) ? requestIP.pop() : requestIP;
  const cleanIP = normalizedIP?.replace(/^::ffff:/, '');

  if (blockedIPs.includes(cleanIP || '')) {
    res.status(403).json({ message: 'Your IP is blocked, if you think this is a mistake please contact the dev on discord https://discord.com/invite/TUqZTutDUz' });
    return;
  }

  next();
};
