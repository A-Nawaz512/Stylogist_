import { adminLoginService, createAdminService, sendToken } from './admin.services.js';
// import { catchAsync } from '../../utils/catchAsync.js';

// ---------------------------
// Admin login
// ---------------------------
export const adminLogin = async (req, res) => {
  // At this point, req.body is already validated by Zod in the route

  console.log("fontend body", req.body)
  const user = await adminLoginService(req.body);

  const userData = sendToken(user, res);

  res.status(200).json({
    status: 'success',
    message: 'Logged in successfully',
    data: userData,
  });
};

// ---------------------------
// Admin logout
// ---------------------------
export const adminLogout = async (req, res) => {
  res.cookie('jwt', 'loggedout', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

// ---------------------------
// Super Admin creates new Staff/Admin
// ---------------------------
export const createAdmin = async (req, res) => {
  // req.body is already validated by Zod in the route
  const newAdmin = await createAdminService(req.body);

  res.status(201).json({
    status: 'success',
    message: `${newAdmin.role} created successfully`,
    data: {
      id: newAdmin._id,
      name: newAdmin.name,
      phone: newAdmin.phone,
      email: newAdmin.email,
      role: newAdmin.role,
    },
  });
};