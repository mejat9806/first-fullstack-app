import mongoose from "mongoose";
import { app } from "./app.js";
const port = process.env.PORT || 8000;

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => console.log("db connection established"))
    .catch((err: any) => console.log("db connection fail", err));
  app.listen(port, () => {
    console.log(`server is running on ${port}`);
  });
};

async () => await connectDB();
