import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
// instance of app
const app = express();
/* connection of app and config.env for port number*/
dotenv.config({ path: "./config/config.env" });
/* for middlewares connect with fronend*/
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
/* cookie-parser setup for user authorization*/

// for user authorization
app.use(cookieParser());
// only parse json requests
app.use(express.json());
// string to json
app.use(express.urlencoded({ extended: true }));
// file upload
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);
// routing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/job", jobRouter);

dbConnection();
app.use(errorMiddleware);
export default app;
