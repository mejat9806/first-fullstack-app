import { globalErrorHandler } from "./controller/errorController";
import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";

import { router as authRoute } from "./routes/authRoutes";
import { router as userRoute } from "./routes/userRoute";
import { router as postRoute } from "./routes/postRoute";
import { router as commentRoute } from "./routes/commentRoutes";
import { router as replyRoute } from "./routes/replyRoute";
import { router as bookmarkRoute } from "./routes/bookMarkRoutes";
import { router as searchRoute } from "./routes/searchRoutes";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";

export const app = express();
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { router as likeRouter } from "./routes/likeRoute.js";
dotenv.config();
const corsOptions = {
  origin: "https://socialmedia-650u.onrender.com",
  // Allow requests from this origin
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // Allow GET and POST requests
  allowedHeaders: [
    "set-cookie",
    "Content-Type",
    "Access-Control-Allow-Origin ",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
  // exposedHeaders: ["Content-Length"], // Expose this custom header
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, //this allow 100 request in 1 hours
  message: "To Many request from  this IP ,pls try again in an hours ",
});
app.use("/", limiter);
app.use(json());
app.use(morgan("dev"));

app.use(ExpressMongoSanitize());
app.use(xss());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
// app.use(helmet());

// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use(compression());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/likeDislike", likeRouter);
app.use("/api/comment", commentRoute);
app.use("/api/reply", replyRoute);
app.use("/api/bookmark", bookmarkRoute);
app.use("/api/search", searchRoute);

//if any error happens in the server/route then it will go to error handler for example in catchAsyync function we got error and it will jump to error handler
//
app.use(globalErrorHandler);
