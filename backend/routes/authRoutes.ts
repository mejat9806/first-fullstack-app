import { Router } from "express";
import cors from "cors";
import {
  loginUser,
  registerUser,
  logout,
  resizeUserPhoto,
  updateMe,
  uploadUserPhoto,
  forgotPassword,
  resetPassword,
  updatePassword,
  isLogin,
  uploadBanner,
  uploadImage,
} from "../controller/authController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
import { validateEmail } from "../controller/validationApi.js";

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
router.post("/checkEmail", validateEmail);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.use(verifyJWT);
router.get("/isLogin", isLogin);
router.patch("/updateMe", uploadImage, resizeUserPhoto, updateMe);
router.patch("/updatePassword", updatePassword);
