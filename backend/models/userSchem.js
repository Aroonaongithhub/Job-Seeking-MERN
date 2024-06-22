import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// user Schema
const userScema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your name."],
    minLength: [3, "number of characters must be atleat 3"],
    maxLength: [30, "number of characters must be less than or equal to 30"],
  },
  email: {
    type: String,
    required: [true, "Provide your email address"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "Provide your password"],
    minLength: [8, "Password length must be atleat 8"],
    maxLength: [32, "Password length must be less than or equal to 32"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "PLease enter your role"],
    enum: ["Job Seeker", "Employee"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// hashing on password before saving it in database
userScema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// comparing password
userScema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generating a json web token
userScema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// creating model
export const User = mongoose.model("User", userScema);
