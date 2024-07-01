import { Router } from "express";
import { verifyJWT } from "../middleware/verifyToken";
import { getAreply, replyToComment } from "../controller/replyController";
export const router = Router();
router.post("/:postId/:commentId", verifyJWT, replyToComment);
router.get("/:postId/:replyId", verifyJWT, getAreply);
