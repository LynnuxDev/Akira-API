import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import { blockedIPMiddleware, rateLimiter, postRateLimiter } from './middleware';
import { logger } from './utils';
import favicon from 'serve-favicon';
import path from 'path';

import akiraRoutes from './routes/akira';
import otherRoutes from './routes/other';
import { getClientIP } from './utils/getIp';

const app: Application = express();
const port = process.env.PORT || 3000;
const faviconPath = path.join(__dirname, 'public', 'favicon.ico');

app.use(blockedIPMiddleware);
app.use(favicon(faviconPath)); // Favicon side wide
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const clientIP = getClientIP(req);
  logger.info(`${req.method} ${req.originalUrl} - ${clientIP}`);
  next();
});

app.use((req, res, next) => {
  if (req.method === 'GET') { // IF need exception add "&& !req.path.startsWith('/exempt')"")
    return rateLimiter(req, res, next);
  }
  next();
});

app.use((req, res, next) => {
  if (req.method === 'POST') {
    return postRateLimiter(req, res, next);
  }
  next();
});

app.use('/akira', akiraRoutes);

app.use('/other', otherRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({status: "online"});
});

/**
 *  301 ERROR PERMANENT MOVED
 */
app.use('/roleplay/*', (req, res) => {
  const newPath = req.originalUrl.replace('/roleplay', '/akira/roleplay');
  res.redirect(301, newPath);
});

app.use('/stats', (req, res) => {
  const newPath = req.originalUrl.replace('/stats', '/akira/stats');
  res.redirect(301, newPath);
});

/**
 *  404 Handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
