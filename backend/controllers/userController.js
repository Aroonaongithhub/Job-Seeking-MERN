import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchem.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !phone || !role || !password) {
    next(new ErrorHandler("complete all rquirements for registration"));
  }

  const isEmail = await User.findOne({ email });
  if (isEmail) {
    next(new ErrorHandler("Email already registered"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    role,
    password,
  });
  // res.status(200).json({
  //   success: true,
  //   message: "Registered successfully",
  //   user,
  // });
  sendToken(user, 201, res, "User registration successful");
});
// loging in functionality with security layer
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Provide email, password and role", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid username or password.", 400));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid username or password.", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler("No user found with this role.", 400));
  }
  sendToken(user, 201, res, "User Logged in successfully");
});

// logout functionality
export const logout = catchAsyncError(async (req, res, next) => {
  // delete the given cookie
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
    secure: true,
    sameSize: "None",
  });
  // give the json response
  res.status(201).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getUser = catchAsyncError(async (req, res, next) => {
  const user = await req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
