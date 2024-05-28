import mongoose from "mongoose";
import { app } from "./app";
const port = process.env.PORT || 8000;

console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("db connection established"))
  .catch((err: any) => console.log("db connection fail", err));
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
