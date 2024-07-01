import express, { json } from "express";
import cors from "cors";
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
  origin: (origin, callback) => {
    console.log("hello for the TS version");

    const allowedOrigins = [
      "https://socialmedia-650u.onrender.com",
      "http://localhost:5173",
    ];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
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
  credentials: true,
};

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

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/likeDislike", likeRouter);
app.use("/api/comment", commentRoute);
app.use("/api/reply", replyRoute);
app.use("/api/bookmark", bookmarkRoute);
app.use("/api/search", searchRoute);

app.use(globalErrorHandler);
