import { Router } from "express";
import { verifyJWT } from "../middleware/verifyToken";
import { likePost } from "../controller/likeController";

export const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "work",
  });
});

router.post("/:postId", verifyJWT, likePost); //get the postid and the userid from verifyJWT
