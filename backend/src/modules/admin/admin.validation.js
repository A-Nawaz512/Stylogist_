// src/modules/admin/admin.validation.js
import { z } from 'zod';

// ---------------------------
// Admin Login Schema
// ---------------------------
// modules/auth/auth.validation.js

export const adminLoginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(128, { message: 'Password too long' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character (@$!%*?&)' }),
  }),
});
// ---------------------------
// Create Staff/Admin Schema (Super Admin only)
// ---------------------------
export const createAdminSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name too long' }),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email({ message: 'Invalid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters' })
      .max(128, { message: 'Password too long' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character (@$!%*?&)' }),
    phone: z.string().min(10, { message: 'Phone is required' }), // <-- added
    role: z.enum(['Staff', 'Super Admin'], { required_error: 'Role is required' }),
  })
});