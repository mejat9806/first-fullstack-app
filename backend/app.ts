import { globalErrorHandler } from "./controller/errorController.js";
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";

import { router as authRoute } from "./routes/authRoutes";
import { router as userRoute } from "./routes/userRoute";
import { router as postRoute } from "./routes/postRoute";
import cookieParser from "cookie-parser";
import morgan from "morgan";

export const app = express();
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();
const corsOptions = {
  origin: ["http://localhost:5173"], // Allow requests from this origin
  methods: ["GET", "POST"], // Allow GET and POST requests
  allowedHeaders: [
    "set-cookie",
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
  exposedHeaders: ["Content-Length"], // Expose this custom header
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, //this allow 100 request in 1 hours
  message: "To Many request from  this IP ,pls try again in an hours ",
});
app.use("/", limiter);
app.use(json());
app.use(morgan("dev"));
helmet({
  crossOriginResourcePolicy: false,
});
app.use(ExpressMongoSanitize());
app.use(xss());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.use(globalErrorHandler);
