// src/middlewares/validate.middleware.js
import { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';

/**
 * Higher-order function that generates a validation middleware.
 * @param {z.AnyZodObject} schema - The Zod schema to validate against.
 * @returns {Function} Express middleware function
 */
export const validate = (schema) => async (req, res, next) => {
  console.log('Request Body:', req.body);  // Ensure the body is logged correctly

  try {
    // Adjust validation to parse the body from `req.body` directly
    const validatedData = await schema.parseAsync({
      body: req.body,  // explicitly use the request body here
      query: req.query,
      params: req.params,
    });

    // Reassign the strictly parsed and stripped data back to the request object
    req.validated = {
      body: validatedData.body,
      query: validatedData.query,
      params: validatedData.params,
    };

    next(); // Proceed to next middleware/route handler
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
      return next(new ApiError(400, `Validation Failed - ${errorMessage}`));
    }

    next(error);  // Pass other errors to the global error handler
  }
};