import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import {
  createTag,
  deleteTag,
  getAllTags,
  singleTag,
  updatedTag,
} from "../controllers/tagControllers.js";

const router = express.Router();

// verify token
router.use(tokenVerify);

// create route
router.get("/", getAllTags);
router.post("/", createTag);
router.get("/:id", singleTag);
router.put("/:id", updatedTag);
router.patch("/:id", updatedTag);
router.delete("/:id", deleteTag);

export default router;
