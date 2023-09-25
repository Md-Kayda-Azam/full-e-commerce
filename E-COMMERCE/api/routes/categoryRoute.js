import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import {
  createCategory,
  deleteCategories,
  deleteCategory,
  getAllCategorys,
  singleCategory,
  statusUpdateCategory,
  updatedCategory,
} from "../controllers/categoryControllers.js";
import { categoryLogo } from "../utils/multer.js";

const router = express.Router();

// verify token
router.use(tokenVerify);

// create route
router.get("/getAllCategory", getAllCategorys);
router
  .post("/", categoryLogo, createCategory)
  .post("/deleteCategories", deleteCategories);
router.get("/:id", singleCategory);
router
  .put("/:id", categoryLogo, updatedCategory)
  .put("/statusUpdate/:id", statusUpdateCategory);
router.patch("/:id", categoryLogo, updatedCategory);
router.delete("/:id", deleteCategory);

export default router;
