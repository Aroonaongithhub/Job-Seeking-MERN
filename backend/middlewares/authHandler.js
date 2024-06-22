import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchem.js";

export const isAuthorised = catchAsyncError(async (req, res, next) => {
  // from cookie-parser
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  next();
});
