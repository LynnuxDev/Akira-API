import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import { blockedIPMiddleware, rateLimiter } from './middleware';
import { logger } from './utils';

import akiraRoutes from './routes/akira';

const app: Application = express();  // Explicitly define the type
const port = process.env.PORT || 3000;

app.use(blockedIPMiddleware);

app.use(bodyParser.json());

// Log middleware for incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
});

// Use the akira routes
app.use('/akira', akiraRoutes);

// Main page.
app.get('/', async (req, res) => {
  res.status(200).json({status: "online"});
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
