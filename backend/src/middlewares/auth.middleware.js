import jwt from 'jsonwebtoken';
import { User } from '../modules/users/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import env from '../config/env.js';
import { catchAsync } from '../utils/catchAsync.js';

// Middleware to protect routes using JWT in HTTP-only cookie
export const authMiddleware = catchAsync(async (req, res, next) => {
  let token;

  // 1️⃣ Check if token exists in cookies
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new ApiError(401, 'You are not logged in! Please log in to access this route.'));
  }

  // 2️⃣ Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, env.jwtSecret);
  } catch (err) {
    return next(new ApiError(401, 'Invalid or expired token.'));
  }

  // 3️⃣ Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new ApiError(401, 'The user belonging to this token no longer exists.'));
  }

  // 4️⃣ Attach user to request object
  req.user = { id: currentUser._id, role: currentUser.role };
  next();
});