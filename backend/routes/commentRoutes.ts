import { Router } from "express";
import {
  GetAllComment,
  createComment,
  getAComment,
} from "../controller/commentController";
import { verifyJWT } from "../middleware/verifyToken";

export const router = Router();

router.get("/:commentId", getAComment);
// router.get("/:postId", GetAllComment);
router.post("/:postId", verifyJWT, createComment);
