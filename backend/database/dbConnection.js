import mongoose from "mongoose";
// database creation
export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Job_Seeking_database",
    })
    .then(() => {
      console.log("database connection established");
    })
    .catch((err) => {
      console.log(`connection error: ${err}`);
    });
};
