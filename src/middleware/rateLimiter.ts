import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute in milliseconds
  max: 1000,
  message: 'Please try again later, Too many request', 
  headers: true,
});

// ====================================================================================================
// ====================================================================================================
