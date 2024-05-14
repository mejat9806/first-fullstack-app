import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router as authROute } from "./routes/authRoutes";
import { router as userRoute } from "./routes/userRoute";
import { router as postRoute } from "./routes/postRoute";
import cookieParser from "cookie-parser";
import morgan from "morgan";

export const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authROute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
