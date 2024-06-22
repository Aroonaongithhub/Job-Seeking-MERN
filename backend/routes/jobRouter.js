import express from "express";
import {
  addJob,
  deleteJob,
  getJobs,
  myPostedJobs,
  updateJob,
  getJob,
} from "../controllers/jobController.js";
import { isAuthorised } from "../middlewares/authHandler.js";

const router = express.Router();

router.get("/jobs", getJobs);
router.post("/post", isAuthorised, addJob);
router.get("/my-posts", isAuthorised, myPostedJobs);
router.put("/update/:id", isAuthorised, updateJob);
router.delete("/delete/:id", isAuthorised, deleteJob);
router.get("/:id", isAuthorised, getJob);
export default router;
