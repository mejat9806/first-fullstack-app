import { Router } from "express";
import cors from "cors";
import { loginUser, registerUser, getProfile, logout, resizeUserPhoto, updateMe, uploadUserPhoto, forgotPassword, resetPassword, updatePassword, } from "../controller/authController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
import { validateEmail } from "../controller/validationApi.js";
export const router = Router();
router.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.post("/checkEmail", validateEmail);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
router.use(verifyJWT);
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
router.get("/profile", getProfile);
router.patch("/updatePassword", updatePassword);