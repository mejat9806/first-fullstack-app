import express from "express";
import {
  createAPost,
  getAllPost,
  getOnePost,
  resizePostImage,
  uploadPostImage,
} from "../controller/postController";
import { verifyJWT } from "../middleware/verifyToken";

export const router = express.Router();

router.get("/", getAllPost);
router.get("/:postId", getOnePost);

router.post(
  "/create",
  verifyJWT,
  uploadPostImage,
  resizePostImage,
  createAPost,
);
