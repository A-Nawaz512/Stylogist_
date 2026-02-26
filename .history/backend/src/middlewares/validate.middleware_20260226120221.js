// src/middlewares/validate.middleware.js
import { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';

/**
 * Higher-order function that generates a validation middleware.
 * @param {z.AnyZodObject} schema - The Zod schema to validate against.
 * @returns {Function} Express middleware function
 */
export const validate = (schema) => async (req, res, next) => {
  try {
    // Composition: We parse the request object based on the provided schema.
    // This allows the schema to define expectations for body, query, and params simultaneously.
    const validatedData = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // Reassign the strictly parsed and stripped data back to the request object.
    // This removes any malicious or unexpected extra fields an attacker might have injected.
     req.validated = {
      body: validatedData.body,
      query: validatedData.query,
      params: validatedData.params,
    };

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Map Zod's complex error array into a single, readable string for the client
      const errorMessage = error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join(', ');
      
      // Pass the formatted error to our centralized error handler
      return next(new ApiError(400, `Validation Failed - ${errorMessage}`));
    }
    
    next(error);
  }
};