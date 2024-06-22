import express from "express";
import {
  getApplications,
  getAppliedJobs,
  deleteAppliedJobs,
  ApplyForJob,
} from "../controllers/applicationController.js";
import { isAuthorised } from "../middlewares/authHandler.js";

const router = express.Router();

router.get("/employee/applications", isAuthorised, getApplications);
router.get("/job-seeker/applied-Jobs", isAuthorised, getAppliedJobs);
router.delete("/delete-applied-job/:id", isAuthorised, deleteAppliedJobs);
router.post("/apply", isAuthorised, ApplyForJob);

export default router;
