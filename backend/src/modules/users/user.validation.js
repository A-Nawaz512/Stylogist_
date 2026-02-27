import { z } from 'zod';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format').optional(),
  }).refine(data => data.name || data.email || data.phone, {
    message: 'Please provide at least one field to update',
    path: ['name', 'email', 'phone'],
  }),
});