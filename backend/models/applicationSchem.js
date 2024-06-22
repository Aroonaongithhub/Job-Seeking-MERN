import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Provide your name."],
    minLength: [3, "name must have at least 3 characters"],
    maxLength: [30, "name must not exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Provide your email address"],
    validator: [validator.isEmail, "Provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Provide your phone number"],
  },
  address: {
    type: String,
    required: [true, "Provide your address"],
  },
  coverLetter: {
    type: String,
    required: [true, "Provide your cover letter"],
  },
  resume: {
    publicID: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  employID: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employee"],
      required: true,
    },
  },
});

export const Application = mongoose.model("Application", applicationSchema);
