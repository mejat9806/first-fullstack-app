import { Router } from "express";
import { search } from "../controller/searchController.js";
export const router = Router();
router.get("/", search);
