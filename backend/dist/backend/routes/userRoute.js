import express from "express";
import { getAlluser, getUser } from "../controller/userController.js";
export const router = express.Router();
router.get("/:id", getUser);
router.get("/", getAlluser);
