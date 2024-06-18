import { Router } from "express";
import { addBookmark, getAllBookmarks } from "../controller/bookmarkController";
import { verifyJWT } from "../middleware/verifyToken";

export const router = Router();

router.get("/:userId", verifyJWT, getAllBookmarks);
router.post("/addBookmark/:postId", verifyJWT, addBookmark);
