// src/utils/catchAsync.js

/**
 * Wraps an asynchronous Express route handler/middleware to automatically catch errors.
 * * @param {Function} fn - The async controller function to wrap.
 * @returns {Function} - A new Express middleware function.
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    // Execute the function, resolve it as a promise, and catch any rejections
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};