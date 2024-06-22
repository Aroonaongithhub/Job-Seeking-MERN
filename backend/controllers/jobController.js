import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchem.js";

// get the job posted
export const getJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

// for posting a job
export const addJob = catchAsyncError(async (req, res, next) => {
  //   const { role } = req.user;
  const role = req.user.role;
  if (role === "Job Seeker") {
    return next(new ErrorHandler(400, "Job Seeker can not post a job!"));
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler(400, "Provide all required fields"));
  }
  if ((!salaryFrom || !salaryTo) && !fixSalary) {
    return next(
      new ErrorHandler(
        400,
        "You are required to provide any of one salary type"
      )
    );
  }
  if (salaryFrom && salaryTo && fixSalary) {
    return next(new ErrorHandler(400, "You must choose one salary type"));
  }
  const postBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixSalary,
    salaryFrom,
    salaryTo,
    postBy,
  });
  res.status(200).json({
    success: true,
    message: "Job posted successfully",
    job,
  });
});
// functionality for posted jobs
export const myPostedJobs = catchAsyncError(async (req, res, next) => {
  const role = req.user.role;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        400,
        "Job Seeker is not allowed to access this resource."
      )
    );
  }
  const myJobs = await Job.find({ postBy: req.user._id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});
// undate the job post functionality
export const updateJob = catchAsyncError(async (req, res, next) => {
  const role = req.user.role;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        400,
        "Job Seeker is not allowed to access this resource."
      )
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler(404, "Job not found"));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    job,
    message: "Job updated successfully",
  });
});
//  delete the job functionality
export const deleteJob = catchAsyncError(async (req, res, next) => {
  const role = req.user.role;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        400,
        "Job Seeker is not allowed to access this resource."
      )
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler(404, "Job not found"));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job deleted successfully",
  });
});

// get single job
export const getJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
