import express, { json } from "express";
import cors from "cors";
import { router as authRoute } from "./routes/authRoutes.js";
import { router as userRoute } from "./routes/userRoute.js";
import { router as postRoute } from "./routes/postRoute.js";
import { router as commentRoute } from "./routes/commentRoutes.js";
import { router as replyRoute } from "./routes/replyRoute.js";
import { router as bookmarkRoute } from "./routes/bookMarkRoutes.js";
import { router as searchRoute } from "./routes/searchRoutes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { router as likeRouter } from "./routes/likeRoute.js";
import { globalErrorHandler } from "./controller/errorController.js";
dotenv.config();
const corsOptions = {
  origin: "https://socialmedia-650u.onrender.com",
  // origin: "http://localhost:5173",
  // Allow requests from this origin
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // Allow GET and POST requests
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "Set-Cookie",
    "Access-Control-Allow-Headers",
    "Access-Control-Expose-Headers",
  ],
  exposedHeaders: ["Content-Length"], // Expose this custom header
  credentials: true, // Allow credentials (cookies, HTTP authentication)
};
console.log(corsOptions.origin, "origin link");
console.log("dadasdasdsad");
export const app = express();
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour.",
});
app.use("/", limiter);
app.use(json());
app.use(morgan("dev"));
app.use(ExpressMongoSanitize());
app.use(xss());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use(
  "/api/auth",
  (req, res) => {
    // Set CORS headers for this specific route
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://socialmedia-650u.onrender.com",
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");

    // Your route logic here
    res.json({ message: "Hello from /api/example" });
  },
  authRoute,
);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/likeDislike", likeRouter);
app.use("/api/comment", commentRoute);
app.use("/api/reply", replyRoute);
app.use("/api/bookmark", bookmarkRoute);
app.use("/api/search", searchRoute);
app.use(globalErrorHandler);
