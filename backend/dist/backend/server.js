import mongoose from "mongoose";
import { app } from "./app.js";
const port = process.env.PORT || 8000;
console.log("Starting application...");
console.log(`PORT: ${port}`);
console.log(`MONGO_URL: ${process.env.MONGO_URL}`);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("db connection established"))
    .catch((err) => console.log("db connection fail", err));
app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
