import { Router } from "express";
import {
  toogleBookmark,
  getAllBookmarks,
} from "../controller/bookmarkController.js";
import { verifyJWT } from "../middleware/verifyToken.js";
export const router = Router();
router.get("/:userId", verifyJWT, getAllBookmarks);
router.post("/addBookmark/:postId", verifyJWT, toogleBookmark);
