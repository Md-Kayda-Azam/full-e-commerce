import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import {
  createCategory,
  deleteCategory,
  getAllCategorys,
  singleCategory,
  updatedCategory,
} from "../controllers/categoryControllers.js";
import { categoryLogo } from "../utils/multer.js";

const router = express.Router();

// verify token
router.use(tokenVerify);

// create route
router.get("/", getAllCategorys);
router.post("/", categoryLogo, createCategory);
router.get("/:id", singleCategory);
router.put("/:id", categoryLogo, updatedCategory);
router.patch("/:id", categoryLogo, updatedCategory);
router.delete("/:id", deleteCategory);

export default router;
