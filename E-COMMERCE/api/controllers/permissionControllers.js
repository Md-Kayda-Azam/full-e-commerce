import { slugCreate } from "../helper/slugCreate.js";
import Permission from "../models/Permission.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcrypt";

/**
 * get all Permissions
 * @param {*} req
 * @param {*} res
 */
export const getAllPermissions = async (req, res, next) => {
  try {
    const permission = await Permission.find();
    if (permission.length > 0) {
      res.status(200).json(permission);
    }
  } catch (error) {
    next(createError("Data can not all get", 400));
  }
};
/**
 * create Permission
 * @param {*} req
 * @param {*} res
 */
export const createPermission = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      next(createError("All fields are required"));
    }
    // permission check
    const permissionCheck = await Permission.findOne({ name });

    if (permissionCheck) {
      next(createError("Permission already axist"));
    }
    // create data
    const permission = await Permission.create({
      name,
      slug: slugCreate(name),
    });

    res
      .status(200)
      .json({ permission, message: "permission data create successful" });
  } catch (error) {
    next(createError("Create data can not Permission", 400));
  }
};
/**
 * single Permission
 * @param {*} req
 * @param {*} res
 */
export const singlePermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);
    res.status(200).json(permission);
  } catch (error) {
    next(createError("Single data not found", 400));
  }
};
/**
 * delete permission
 * @param {*} req
 * @param {*} res
 */
export const deletePermission = async (req, res, next) => {
  try {
    const { id } = req.params;

    const permission = await Permission.findByIdAndDelete(id);

    res
      .status(200)
      .json({ permission, message: "Permission  deleted successfull" });
  } catch (error) {
    next(createError("Permission delete not found", 400));
  }
};
/**
 * update permission
 * @param {*} req
 * @param {*} res
 */
export const updatedPermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // update Permission data
    const permission = await Permission.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugCreate(name),
      },
      { new: true }
    );

    res.status(200).json(permission);
  } catch (error) {
    next(createError("Permission update not found", 400));
  }
};
/**
 * status Update Permission
 * @param {*} req
 * @param {*} res
 */
export const statusUpdatePermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // update Permission data
    const permission = await Permission.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );

    res.status(200).json({ permission, message: "Status updated successful" });
  } catch (error) {
    next(createError("Permission update not found", 400));
  }
};

/**
 * Delete permissions
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const deletePermissions = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const permissions = await Permission.find({ _id: { $in: _id } });
    const idList = permissions.map((item) => item._id);

    // Delete permissions with matching _id values
    await Permission.deleteMany({ _id: { $in: _id } });

    return res
      .status(200)
      .json({ idList, message: "All Data deleted successfully" });
  } catch (error) {
    next(createError("brand update not found", 400));
  }
};
