import { Router } from "express";
import { verifyJWT } from "../middleware/verifyToken.js";
import { getAreply, replyToComment } from "../controller/replyController.js";
export const router = Router();
router.post("/:postId/:commentId", verifyJWT, replyToComment);
router.get("/:postId/:replyId", verifyJWT, getAreply);
