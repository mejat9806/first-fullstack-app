import express from "express";
import {
  createAPost,
  deletePost,
  getAllPost,
  getOnePost,
  resizePostImage,
  uploadPostImage,
} from "../controller/postController";
import { verifyJWT } from "../middleware/verifyToken";

export const router = express.Router();

router.get("/", getAllPost);
router.route("/:postId").get(getOnePost).delete(verifyJWT, deletePost);

router.post(
  "/create",
  verifyJWT,
  uploadPostImage,
  resizePostImage,
  createAPost,
);
