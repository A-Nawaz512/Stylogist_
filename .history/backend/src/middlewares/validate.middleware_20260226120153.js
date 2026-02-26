import { z } from 'zod';
import { ApiError } from '../utils/ApiError.js';

export const validate = (schema) => async (req, res, next) => {
  try {
    const validatedData = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // Instead of overwriting req.query / req.params, store validated data separately
    req.validated = {
      body: validatedData.body,
      query: validatedData.query,
      params: validatedData.params,
    };

    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((issue) => {
          const path = issue.path.length ? issue.path.join('.') : 'root';
          return `${path}: ${issue.message}`;
        })
        .join(', ');

      return next(new ApiError(400, `Validation Failed - ${errorMessage}`));
    }

    next(error);
  }
};