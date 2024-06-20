import { Router } from "express";
import { search } from "../controller/searchController";

export const router = Router();

router.get("/", search);
