import rateLimit from 'express-rate-limit';
import { Request } from 'express';

/**
 * Get Request rateLimit 5 per seconde
 */
export const rateLimiter = rateLimit({
  windowMs: 1000,
  max: 5, // Max 5 Requests per seconde
  message: { message: 'Too many requests, please try again later.' },
  keyGenerator: (req: Request) => {
    const realIP = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
    return Array.isArray(realIP) ? realIP[0] : realIP || "";
  },
});

/**
 * Post Request rateLimit 1 per seconde
 */
export const postRateLimiter = rateLimit({
  windowMs: 1000,
  max: 1, // Max 1 Requests per seconde
  message: { message: 'Too many requests, please try again later.' },
  keyGenerator: (req: Request) => {
    const realIP = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
    return Array.isArray(realIP) ? realIP[0] : realIP || "";
  },
})