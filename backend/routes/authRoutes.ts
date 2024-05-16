import { Router } from "express";
import cors from "cors";
import {
  loginUser,
  registerUser,
  test,
  getProfile,
  logout,
} from "../controller/authController";
import { verifyJWT } from "../middleware/verifyToken";

export const router = Router();
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/profile", verifyJWT, getProfile);
