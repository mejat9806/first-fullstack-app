import express from "express";
import {
  createAPost,
  deletePost,
  getAllPost,
  getFriendPost,
  getLatestPost,
  getOnePost,
  getPopularPost,
  updatePost,
} from "../controller/postController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
import { resizePostImage, uploadPostImage } from "../utils/multerMultiImage.js";

export const router = express.Router();

router.get("/following", verifyJWT, getFriendPost);
router.get("/latest", getLatestPost, getAllPost);
router.get("/popular", getPopularPost, getAllPost);
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
