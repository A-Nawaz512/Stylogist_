import { User } from './user.model.js';
import { ApiError } from '../../utils/ApiError.js';


// GET /api/users/me
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return next(new ApiError(404, 'User not found'));

  res.status(200).json({ status: 'success', data: { user } });
};

// PATCH /api/users/me
export const updateProfile = async (req, res) => {
  const updates = req.validated.body;

  const user = await User.findById(req.user.id);
  if (!user) return next(new ApiError(404, 'User not found'));

  Object.assign(user, updates);
  await user.save();

  res.status(200).json({ status: 'success', message: 'Profile updated', data: { user } });
};