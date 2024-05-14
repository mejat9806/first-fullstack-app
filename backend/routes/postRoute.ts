import express from "express";
import { createAPost, getAllPost } from "../controller/postController";
import { verifyJWT } from "../middleware/verifyToken";

export const router = express.Router();

router.get("/", getAllPost);

router.post("/create", verifyJWT, createAPost);
