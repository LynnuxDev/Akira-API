import { Request, Response, NextFunction } from 'express';

const allowedIPs = ['127.0.0.1']; // TODO: get this list from a database.

/**
 * Check if user is a valid user.
 * @returns 403 Error if user isn't allowed to use path.
 */
export const validateIPMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
  const requestIP = req.headers['x-real-ip'] || req.ip || req.connection.remoteAddress;

  const normalizedIP = Array.isArray(requestIP) ? requestIP.pop() : requestIP;

  if (allowedIPs.includes(normalizedIP || '')) {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden' });
  }
};
