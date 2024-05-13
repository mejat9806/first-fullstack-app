import mongoose from "mongoose";
import { app } from "./app";

console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("db connection established"))
  .catch((err: any) => console.log("db connection fail", err));
const port = 8000;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
