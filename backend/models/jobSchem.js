import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Provide Job Title"],
    minLength: [3, "Tile length must be atleast 3 characters"],
    maxLength: [40, "Tile Length must not exceed 40 characters"],
  },
  description: {
    type: String,
    required: [true, "Provide Job description"],
    minLength: [10, "Description length must be atleast 10 characters"],
    maxLength: [350, "Description Length must not exceed 350 characters"],
  },
  category: {
    type: String,
    required: [true, "Please select a category"],
  },
  country: {
    type: String,
    required: [true, "Please select a country"],
  },
  city: {
    type: String,
    required: [true, "Please select a city"],
  },
  location: {
    type: String,
    required: [true, "Provide the exact location"],
    minLength: [10, "Location must be atleast 10 characters"],
  },
  fixSalary: {
    type: Number,
    minSalary: [4, "Fixed Salary must caontain atleast 4 digits"],
    maxSalary: [9, "Fixed Salary must not exceed more than 9 digits"],
  },
  salaryFrom: {
    type: Number,
    minSalary: [4, "Salary From must caontain atleast 4 digits"],
    maxSalary: [9, "Salary From must not exceed more than 9 digits"],
  },
  salaryTo: {
    type: Number,
    minSalary: [4, "Salary To must caontain atleast 4 digits"],
    maxSalary: [9, "Salary To must not exceed more than 9 digits"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now(),
  },
  postBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Job = mongoose.model("Job", jobSchema);
