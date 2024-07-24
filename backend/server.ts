import mongoose from "mongoose";
import { app, httpServer } from "./app.js";
const port = process.env.PORT || 8000;

const memoryUsage = process.memoryUsage();
console.log(memoryUsage);
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("db connection established"))
    .catch((err: any) => console.log("db connection fail", err));
  httpServer.listen(port, () => {
    console.log("http server is running");
  });
  // app.listen(port, () => {
  //   console.log(`server is running on ${port}`);
  // });
};

connectDB();
