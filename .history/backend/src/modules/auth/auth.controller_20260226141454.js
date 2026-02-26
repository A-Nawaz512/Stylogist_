import { User } from '../users/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { sendEmail } from '../../utils/email.js';
import { createSendToken } from './auth.service.js';
import jwt from 'jsonwebtoken';
import env from '../../config/env.js';
import crypto from 'node:crypto';

const signToken = (id) => {
  return jwt.sign({ id }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
};

export const register = async (req, res, next) => {
  // 1. Check if email or phone already exists (optional, as MongoDB handles this via index, 
  // but doing it here allows for cleaner, specific error messages to the client)
  const existingUser = await User.findOne({ $or: [{ email: req.body.email }, { phone: req.body.phone }] });
  if (existingUser) {
    return next(new ApiError(409, 'Email or phone number is already in use.'));
  }

  // 2. Create user (Bcrypt hook fires automatically)
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    // Note: We explicitly DO NOT pass req.body.role here. 
    // Otherwise, a malicious user could register as 'Super Admin'.
  });

  // 3. Generate Token
  const token = signToken(newUser._id);

  // 4. Remove password from the output completely
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser }
  });
};


export const forgotPassword = async (req, res, next) => {
  // 1. Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError(404, 'There is no user with that email address.'));
  }

  // 2. Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false }); // Skip Zod/Mongoose strict validation for this quick save

  // 3. Send it to user's email
  const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  const message = `Forgot your password? Submit a new password to: \n${resetURL}\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 mins)',
      message,
    });

    res.status(200).json({ status: 'success', message: 'Token sent to email!' });
  } catch (err) {
    // If email fails, we MUST wipe the token from the DB to prevent dangling access
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ApiError(500, 'There was an error sending the email. Try again later!'));
  }
};

export const resetPasswordSchema = z.object({
  params: z.object({
    token: z.string().min(1, 'Reset token is required'),
  }),
  body: z.object({
    password: z.string().min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
  })
});