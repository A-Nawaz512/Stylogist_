
import { User } from '../users/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../config/env.js';

// 🔹 Sign JWT token
export const signToken = (id) => jwt.sign({ id }, env.jwtSecret, { expiresIn: '7d' });

// 🔹 Create JWT cookie
export const sendToken = (user, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

// 🔹 Admin login service
export const adminLoginService = async ({ email, password }) => {
  // Find user including password
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new ApiError(401, 'Invalid credentials');

  // Check role
  if (!['Staff', 'Super Admin'].includes(user.role)) {
    throw new ApiError(403, 'Access denied. Not an admin.');
  }

  // Check password

  console.log("Compare", password);


  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) throw new ApiError(401, 'Invalid Password');

  return user;
};

// 🔹 Create new Staff/Admin service
export const createAdminService = async ({ name, email, password, phone, role }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, 'Email already in use');

  console.log("create", password);


  const hashedPassword = await bcrypt.hash(password, 12);

  const newAdmin = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  return newAdmin;
};