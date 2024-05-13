import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { router as authROute } from "./routes/authRoutes";
import cookieParser from "cookie-parser";
export const app = express();
import dotenv from "dotenv";
dotenv.config();

app.use(json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/users", authROute);
