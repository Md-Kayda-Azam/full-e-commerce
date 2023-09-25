import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  singleUsers,
  updatedUser,
  statusUpdateUser,
  deleteUsers,
} from "../controllers/userControllers.js";
import tokenVerify from "../middlewares/verifyToken.js";

const router = express.Router();

// verify token
router.use(tokenVerify);

// create route
router.get("/", getAllUsers);
router.post("/", createUser).post("/deleteUsers", deleteUsers);
router.get("/:id", singleUsers);
router.delete("/:id", deleteUser);
router.post("/:id", statusUpdateUser);
router.patch("/:id", updatedUser);
router.put("/:id", updatedUser);

export default router;
