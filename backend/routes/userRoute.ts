import express from "express";
import {
  followFnc,
  getAlluser,
  getUser,
} from "../controller/userController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
export const router = express.Router();

router.get("/:id", getUser);
router.get("/", getAlluser);
router.post("/follow/:userId", verifyJWT, followFnc);
