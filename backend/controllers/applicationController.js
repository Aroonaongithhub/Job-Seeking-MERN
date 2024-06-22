import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchem.js";
import { Job } from "../models/jobSchem.js";
import cloudinary from "cloudinary";

// Applying functionality
export const ApplyForJob = catchAsyncError(async (req, res, next) => {
  // checking role
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const { role } = req.user;
  if (role === "Employee") {
    return next(
      new ErrorHandler("Employee not allowed to access this resource.", 400)
    );
  }
  //   resume rquired function functionality
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Resume is Required!", 400));
  }
  // format rquired for accepting resume
  const { resume } = req.files;
  const validFormats = ["image/png", "image/jpeg", "image/webp"];
  //   check the attached resume file format(extention)
  if (!validFormats.includes(resume.mimetype)) {
    return next(
      new ErrorHandler("File type must be of PNG or JPEG or WEBP type", 400)
    );
  }
  // Validate the file size
  if (resume.size > MAX_FILE_SIZE) {
    return next(new ErrorHandler("File size exceeds the limit of 5MB.", 400));
  }
  //   enableing the cloudinanry to store the resume and give response back
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error!!",
      cloudinaryResponse.error || "Unknown Cloudinary error!!"
    );

    return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
  }
  // getting fields from fron end
  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Job Seeker",
  };
  //   if there is not such job
  if (!jobId) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  //   if there is no such details found
  const jobDetails = await Job.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found!", 404));
  }
  // get employee id who posted the job
  const employID = {
    user: jobDetails.postBy,
    role: "Employee",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantID ||
    !employID ||
    !resume
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const application = await Application.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantID,
    employID,
    resume: {
      publicID: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Your response submitted successfully!",
    application,
  });
});

// Employer see the appliction for job posted
export const getApplications = catchAsyncError(async (req, res, next) => {
  const role = req.user.role;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler(
        400,
        "Job Seeker is not allowed to access this resource."
      )
    );
  }
  const { _id } = req.user;
  const applications = await Application.find({ "employID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

// Job seeker can see where he have applied
export const getAppliedJobs = catchAsyncError(async (req, res, next) => {
  const role = req.user.role;
  if (role === "Employee") {
    return next(
      new ErrorHandler(400, "Employee is not allowed to access this resource.")
    );
  }
  const { _id } = req.user;
  const applications = await Application.find({ "applicantID.user": _id });
  res.status(200).json({
    success: true,
    applications,
  });
});

//   Job Seeker can delete application functionality
export const deleteAppliedJobs = catchAsyncError(async (req, res, next) => {
  const role = req.user.role;
  if (role === "Employee") {
    return next(
      new ErrorHandler(400, "Employee is not allowed to access this resource.")
    );
  }
  const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    return next(new ErrorHandler(404, "There is no such application found"));
  }
  await application.deleteOne();
  res.status(200).json({
    success: true,
    message: "Application deleted successfully",
  });
});
