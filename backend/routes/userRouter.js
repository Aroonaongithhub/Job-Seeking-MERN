import express from "express";
import {
  login,
  register,
  logout,
  getUser,
} from "../controllers/userController.js";
import { isAuthorised } from "../middlewares/authHandler.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorised, logout);
router.get("/getuser", isAuthorised, getUser);

export default router;
