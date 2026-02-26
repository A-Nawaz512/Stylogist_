import { User } from '../users/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import jwt from 'jsonwebtoken';
import env from '../../config/env.js';

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


import { sendEmail } from '../../utils/email.js';
import { createSendToken } from './auth.service.js';

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

export const resetPassword = async (req, res, next) => {
  // 1. Get user based on the token (we must hash the incoming token to match the DB)
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // Find user where token matches AND expiration is strictly in the future
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. If token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new ApiError(400, 'Token is invalid or has expired'));
  }

  user.password = req.body.password;
  
  // Force invalidation of the token immediately
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  
  await user.save(); // This triggers our pre('save') Bcrypt hook perfectly

  // 3. Log the user in automatically, send JWT
  createSendToken(user, 200, res);
};