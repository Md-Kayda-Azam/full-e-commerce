import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import {
  createProduct,
  deleteProduct,
  getAllproducts,
  singleProduct,
  updatedProduct,
} from "../controllers/productControllers copy.js";
import { productPhotos } from "../utils/multer.js";

// import { ProductLogo } from "../utils/multer.js";

const router = express.Router();

// verify token
router.use(tokenVerify);

// create route
router.get("/", getAllproducts);
router.post("/", productPhotos, createProduct);
router.get("/:id", singleProduct);
router.put("/:id", updatedProduct);
router.patch("/:id", updatedProduct);
router.delete("/:id", deleteProduct);

export default router;
