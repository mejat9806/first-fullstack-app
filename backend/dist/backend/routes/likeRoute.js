import { Router } from "express";
import { verifyJWT } from "../middleware/verifyToken.js";
import { getLike, likePost } from "../controller/likeController.js";
export const router = Router();
router.get("/getlike/:postId/:userId", getLike);
router.post("/:postId", verifyJWT, likePost); //get the postid and the userid from verifyJWT
