import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import {
  createBrand,
  deletebrand,
  getAllBrands,
  singleBrand,
  statusUpdatebrand,
  updatedbrand,
  deleteBrands,
} from "../controllers/brandControllers.js";
import { brandLogo } from "../utils/multer.js";

const router = express.Router();

// verify token
router.use(tokenVerify);

// create route
router.get("/", getAllBrands);
router.post("/", brandLogo, createBrand);
router.get("/:id", singleBrand);
router.put("/:id", brandLogo, updatedbrand);
router.patch("/:id", brandLogo, updatedbrand);
router.delete("/:id", deletebrand);
router.patch("/status/:id", statusUpdatebrand);
router.post("/deleteBrands", deleteBrands);

export default router;
