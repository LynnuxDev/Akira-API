// src/utils/logger.ts
import winston from 'winston';

// Create a logger instance with different log levels
const logger = winston.createLogger({
  level: 'info', // Set the default logging level
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),  // Log to console
    new winston.transports.File({ filename: 'logs/app.log' }) // Log to a file
  ],
});

// Export the logger for use in other parts of the app
export { logger };
