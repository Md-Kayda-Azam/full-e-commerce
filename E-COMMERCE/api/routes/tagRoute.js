import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import {
  createTag,
  deleteTag,
  deleteTags,
  getAllTags,
  singleTag,
  statusUpdateTag,
  updatedTag,
} from "../controllers/tagControllers.js";

const router = express.Router();

// verify token
router.use(tokenVerify);

// create route
router.get("/getAllTags", getAllTags);
router.post("/", createTag);
router.get("/:id", singleTag);
router.put("/:id", updatedTag);
router.patch("/:id", updatedTag);
router.delete("/:id", deleteTag);
router.patch("/:id", statusUpdateTag);
router.put("/:id", statusUpdateTag);
router.put("/status-updated/:id", statusUpdateTag);
router.patch("/status-updated/:id", statusUpdateTag);
router.post("/deleteTags", deleteTags);

export default router;
