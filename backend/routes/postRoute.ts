import express from "express";
import {
  createAPost,
  deletePost,
  getAllPost,
  getLatestPost,
  getOnePost,
  resizePostImage,
  uploadPostImage,
} from "../controller/postController.js";
import { verifyJWT } from "../middleware/verifyToken.js";

export const router = express.Router();

router.get("/", getAllPost);
router.get("/latest", getLatestPost, getAllPost);
// make most like post
router.route("/:postId").get(getOnePost).delete(verifyJWT, deletePost);

router.post(
  "/create",
  verifyJWT,
  uploadPostImage,
  resizePostImage,
  createAPost,
);
