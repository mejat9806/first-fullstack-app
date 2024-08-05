import { Router } from "express";
import {
  createComment,
  getAComment,
  replyToComment,
} from "../controller/commentController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
export const router = Router();
router.get("/:commentId", getAComment);
router.post("/:postId/:commentId", verifyJWT, replyToComment);
// router.get("/:postId", GetAllComment);
router.post("/:postId", verifyJWT, createComment);
