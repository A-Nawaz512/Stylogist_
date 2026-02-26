// src/middlewares/rateLimiter.middleware.js
import rateLimit from 'express-rate-limit';

// Strict limiter for auth routes
export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5,                     // limit each IP to 5 requests
  message: 'Too many attempts, try again in 10 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Relaxed limiter for general API
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 100,             // 100 requests per IP per minute
});