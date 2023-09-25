import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import {
  createRole,
  deleteRole,
  getAllRoles,
  singleRole,
  updatedRole,
  statusUpdateRole,
  deleteRoles,
} from "../controllers/roleControllers.js";

const router = express.Router();

// verify token
router.use(tokenVerify);

// create route
router.get("/", getAllRoles);
router.post("/", createRole).post("/deleteRoles", deleteRoles);
router.get("/:id", singleRole);
router.delete("/:id", deleteRole);
router.put("/:id", updatedRole);
router.patch("/:id", updatedRole);
router.post("/:id", statusUpdateRole);

export default router;
