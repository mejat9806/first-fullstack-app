import { Router } from "express";
import {
  GetAllComment,
  createComment,
  replyToComment,
} from "../controller/commentController";
import { verifyJWT } from "../middleware/verifyToken";

export const router = Router();

router.get("/:postId", GetAllComment);
router.post("/:postId", verifyJWT, createComment);
router.get("/:postId/:commentId", verifyJWT, replyToComment);
