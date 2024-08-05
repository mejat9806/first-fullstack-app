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
import { Server } from "socket.io";
import { createServer } from "http";
dotenv.config();
console.log(process.env.Node_ENV, "brevo");
export const app = express();
export const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "https://viewfinder.website",
      "http://localhost:5173",
      "https://socialmedia-650u.onrender.com",
    ],
  },
});
io.on("connect", (socket) => {
  console.log("connected", socket.id);
});
export const emitPostCreated = () => {
  io.emit("postCreated");
};
const corsOptions = {
  // origin: "https://socialmedia-650u.onrender.com",
  origin: [
    "https://viewfinder.website",
    "http://localhost:5173",
    "https://socialmedia-650u.onrender.com",
  ],
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
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' https://viewfinder.website http://localhost:8000",
  );
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
