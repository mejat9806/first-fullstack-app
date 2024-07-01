import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Import routes
import { router as authRoute } from "./routes/authRoutes";
import { router as userRoute } from "./routes/userRoute";
import { router as postRoute } from "./routes/postRoute";
import { router as commentRoute } from "./routes/commentRoutes";
import { router as replyRoute } from "./routes/replyRoute";
import { router as bookmarkRoute } from "./routes/bookMarkRoutes";
import { router as searchRoute } from "./routes/searchRoutes";
import { router as likeRouter } from "./routes/likeRoute.js";
import { globalErrorHandler } from "./controller/errorController";

dotenv.config();

export const app = express();

const corsOptions = {
  origin: "https://socialmedia-650u.onrender.com",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"], // Allow GET and POST requests
  preflightContinue: false,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Access-Control-Allow-Headers",
    "Accept",
    "Authorization",
    " Access-Control-Expose-Headers",
    "Set-Cookie",
  ],

  credentials: true, // Allow credentials (cookies, HTTP authentication)
};

app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://socialmedia-650u.onrender.com",
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie",
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });
// Handle preflight requests
app.options("*", cors(corsOptions), (req, res) => {
  res.status(204).json("hello from server").end();
});

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // Allow 1000 requests per hour
  message: "Too many requests from this IP, please try again in an hour",
});

app.use(limiter);
app.use(express.json());
app.use(morgan("dev"));
app.use(ExpressMongoSanitize());
app.use(xss());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use((req, res, next) => {
  console.log("CORS Headers:", res.getHeaders());
  next();
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/likeDislike", likeRouter);
app.use("/api/comment", commentRoute);
app.use("/api/reply", replyRoute);
app.use("/api/bookmark", bookmarkRoute);
app.use("/api/search", searchRoute);

app.use(globalErrorHandler);
