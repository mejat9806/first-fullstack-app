import express from "express";
import {
  createAPost,
  deletePost,
  getAllPost,
  getLatestPost,
  getOnePost,
  resizePostImage,
  updatePost,
  uploadPostImage,
} from "../controller/postController.js";
import { verifyJWT } from "../middleware/verifyToken.js";

export const router = express.Router();

router.get("/", getAllPost);
router.get("/latest", getLatestPost, getAllPost);
// make most like post
router
  .route("/:postId")
  .get(getOnePost)
  .delete(verifyJWT, deletePost)
  .patch(uploadPostImage, resizePostImage, updatePost);

router.post(
  "/create",
  verifyJWT,
  uploadPostImage,
  resizePostImage,
  createAPost,
);
