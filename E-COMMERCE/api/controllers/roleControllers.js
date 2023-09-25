import { slugCreate } from "../helper/slugCreate.js";
import Role from "../models/Role.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcrypt";

/**
 * get all Roles
 * @param {*} req
 * @param {*} res
 */
export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find();
    if (roles.length > 0) {
      res.status(200).json(roles);
    }
  } catch (error) {
    next(createError("Data can not all get", 400));
  }
};
/**
 * create Role
 * @param {*} req
 * @param {*} res
 */
export const createRole = async (req, res, next) => {
  try {
    const { name, permissions } = req.body;

    if (!name) {
      next(createError("All fields are required"));
    }
    // Role check
    const RoleCheck = await Role.findOne({ name });

    if (RoleCheck) {
      next(createError("Role already axist"));
    }
    // create data
    const role = await Role.create({
      name,
      slug: slugCreate(name),
      permissions: [...permissions],
    });

    res.status(200).json({
      role,
      message: "Role created successful",
    });
  } catch (error) {
    next(createError("Create data can not Role", 400));
  }
};
/**
 * single Role
 * @param {*} req
 * @param {*} res
 */
export const singleRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    res.status(200).json({
      role,
      message: "Single data successful",
    });
  } catch (error) {
    next(createError("Single data not found", 400));
  }
};
/**
 * delete product brand
 * @param {*} req
 * @param {*} res
 */
export const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;

    const role = await Role.findByIdAndDelete(id);

    res.status(200).json({
      role,
      message: "Role delete data successful",
    });
  } catch (error) {
    next(createError("Role delete not found", 400));
  }
};
/**
 * update product brand
 * @param {*} req
 * @param {*} res
 */
export const updatedRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    // update Role data
    const role = await Role.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugCreate(name),
        permissions: permissions,
      },
      { new: true }
    );

    res.status(200).json({
      role,
      message: "Role updated successful",
    });
  } catch (error) {
    next(createError("Role update not found", 400));
  }
};
/**
 * status Update Role
 * @param {*} req
 * @param {*} res
 */
export const statusUpdateRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // update Permission data
    const role = await Role.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );

    res.status(200).json({ role, message: "Status updated successful" });
  } catch (error) {
    next(createError("Role update not found", 400));
  }
};

export const deleteRoles = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const roles = await Role.find({ _id: { $in: _id } });
    const idList = roles.map((item) => item._id);

    // Delete  with matching _id values
    await Role.deleteMany({ _id: { $in: _id } });

    return res
      .status(200)
      .json({ idList, message: "All Data deleted successfully" });
  } catch (error) {
    next(createError("Role Selected Rows deleted not found", 400));
  }
};
