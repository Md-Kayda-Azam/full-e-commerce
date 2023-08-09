import express from "express";
import tokenVerify from "../middlewares/verifyToken.js";
import {
  createPermission,
  deletePermission,
  getAllPermissions,
  singlePermission,
  updatedPermission,
  statusUpdatePermission,
} from "../controllers/permissionControllers.js";

const router = express.Router();

// verify token
router.use(tokenVerify);

// create route
router.get("/", getAllPermissions);
router.post("/", createPermission);
router.get("/:id", singlePermission);
router.delete("/:id", deletePermission);
router.put("/:id", updatedPermission);
router.patch("/:id", updatedPermission);
router.post("/:id", statusUpdatePermission);

export default router;
