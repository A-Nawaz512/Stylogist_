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