import { slugCreate } from "../helper/slugCreate.js";
import Tag from "../models/Tag.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcrypt";

/**
 * get all Tags
 * @param {*} req
 * @param {*} res
 */
export const getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    if (tags.length > 0) {
      res.status(200).json({
        tags,
        message: "Get all tags successful",
      });
    }
  } catch (error) {
    next(createError("Tag data not found", 400));
  }
};
/**
 * create Tag
 * @param {*} req
 * @param {*} res
 */
export const createTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      next(createError("All fields are required"));
    }
    // Tag check
    const tagCheck = await Tag.findOne({ name });

    if (tagCheck) {
      next(createError("Tag already axist"));
    }
    // create data
    const tag = await Tag.create({
      name,
      slug: slugCreate(name),
    });

    res.status(200).json({
      tag,
      message: "Tag created successful",
    });
  } catch (error) {
    next(createError("Create data can not Tag", 400));
  }
};
/**
 * single Tag
 * @param {*} req
 * @param {*} res
 */
export const singleTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findById(id);
    res.status(200).json({
      tag,
      message: "Single data successful",
    });
  } catch (error) {
    next(createError("Single data not found", 400));
  }
};
/**
 * delete product Tag
 * @param {*} req
 * @param {*} res
 */
export const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByIdAndDelete(id);

    res.status(200).json({
      tag,
      message: "Tag delete data successful",
    });
  } catch (error) {
    next(createError("Tag delete not found", 400));
  }
};
/**
 * update product Tag
 * @param {*} req
 * @param {*} res
 */
export const updatedTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // update Tag data
    const tag = await Tag.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugCreate(name),
      },
      { new: true }
    );

    res.status(200).json({
      tag,
      message: "Tag updated successful",
    });
  } catch (error) {
    next(createError("Tag update not found", 400));
  }
};
/**
 * status Update Tag
 * @param {*} req
 * @param {*} res
 */
export const statusUpdateTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // update Permission data
    const tag = await Tag.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );

    res.status(200).json({ tag, message: "Status updated successful" });
  } catch (error) {
    next(createError("Tag update not found", 400));
  }
};
/**
 * product tag slected data delete
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const deleteTags = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const tags = await Tag.find({ _id: { $in: _id } });
    const idList = tags.map((item) => item._id);

    // Delete brands with matching _id values
    await Tag.deleteMany({ _id: { $in: _id } });

    res.status(200).json({ idList, message: "All Data deleted successful" });
  } catch (error) {
    next(createError("brand update not found", 400));
  }
};
