import { Request } from 'express';

export function getClientIP(req: Request): string {
  const xForwardedFor = req.headers['x-forwarded-for'];

  if (typeof xForwardedFor === 'string') {
    return xForwardedFor.split(',')[0].trim();
  } else if (Array.isArray(xForwardedFor)) {
    return xForwardedFor[0].trim();
  }

  return req.ip || '0.0.0.0';
}
