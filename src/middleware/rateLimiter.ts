import rateLimit from 'express-rate-limit';
import { Request } from 'express';

/**
 * Get Request rateLimit 30 per minute
 */
export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10, // Max 10 Requests per minute
  message: { message: 'Too many requests, please try again later.' },
  keyGenerator: (req: Request) => {
    const ip = req.ip || '';
    return ip;
  },
});

/**
 * Post Request rateLimit 1 per minute
 */
export const postRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1, // Max 1 Requests per minute
  message: { message: 'Too many requests, please try again later.' },
  keyGenerator: (req: Request) => {
    const ip = req.ip || '';
    return ip;
  },
})