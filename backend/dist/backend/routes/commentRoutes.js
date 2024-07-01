import { Router } from "express";
import { createComment, getAComment, replyToComment, } from "../controller/commentController";
import { verifyJWT } from "../middleware/verifyToken";
export const router = Router();
router.get("/:commentId", getAComment);
router.post("/:postId/:commentId", verifyJWT, replyToComment);
// router.get("/:postId", GetAllComment);
router.post("/:postId", verifyJWT, createComment);
