import { Router } from "express";
import { GetAllComment, createComment } from "../controller/commentController";
import { verifyJWT } from "../middleware/verifyToken";

export const router = Router();

router.get("/:postId", GetAllComment);
router.get("/:commentId", GetAllComment);
router.post("/:postId", verifyJWT, createComment);
