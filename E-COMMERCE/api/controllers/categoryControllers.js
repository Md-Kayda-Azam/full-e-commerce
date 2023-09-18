import { slugCreate } from "../helper/slugCreate.js";
import Category from "../models/Category.js";
import { cloudPhotoDelete, cloudUploads } from "../utils/cloudinary.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcrypt";

/**
 * get all Categorys
 * @param {*} req
 * @param {*} res
 */
export const getAllCategorys = async (req, res, next) => {
  const categorys = await Category.find().populate([
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
  ]);

  if (categorys.length > 0) {
    return res.status(200).json(categorys);
  }

  res.status(400).json({ message: "Category data not found" });
};
/**
 * create Category
 * @param {*} req
 * @param {*} res
 */
export const createCategory = async (req, res, next) => {
  try {
    const { name, parentCategory, icon } = req.body;

    if (!name) {
      next(createError("All fields are required"));
    }
    // Category check
    const categoryCheck = await Category.findOne({ name });

    if (categoryCheck) {
      next(createError("Category already axist"));
    }

    // category icon
    let Icon = null;
    if (icon) {
      Icon = icon;
    }

    // category logo upload
    let logoFile = null;
    if (req.file) {
      const logo = await cloudUploads(req.file.path);
      logoFile = logo;
    }

    // create data
    const category = await Category.create({
      name,
      slug: slugCreate(name),
      parentCategory: parentCategory ? parentCategory : null,
      photo: logoFile,
      icon: Icon,
    });

    if (parentCategory) {
      const parent = await Category.findByIdAndUpdate(parentCategory, {
        $push: { subCategory: category._id },
      });
    }

    res.status(200).json({
      category,
      message: "Category created successful",
    });
  } catch (error) {
    console.log(error);
    next(createError("Create data can not Category", 400));
  }
};
/**
 * single Category
 * @param {*} req
 * @param {*} res
 */
export const singleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate([
      {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
          populate: {
            path: "parentCategory",
          },
        },
      },
      {
        path: "subCategory",
        populate: {
          path: "subCategory",
          populate: {
            path: "subCategory",
          },
        },
      },
    ]);
    res.status(200).json({
      category,
      message: "Single data successful",
    });
  } catch (error) {
    next(createError("Single data not found", 400));
  }
};
/**
 * delete product Category
 * @param {*} req
 * @param {*} res
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    // Delete Category photo
    if (category.photo) {
      await cloudPhotoDelete(category.photo);
    }

    res.status(200).json({
      category,
      message: "Category delete data successful",
    });
  } catch (error) {
    next(createError("Category delete not found", 400));
  }
};
/**
 * update product Category
 * @param {*} req
 * @param {*} res
 */
export const updatedCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, parentCategory, icon } = req.body;

    if (!name) {
      next(createError("All field are required!"));
    }

    const updateCategory = await Category.findById(id);

    if (!updateCategory) {
      next(createError("Category data not found!"));
    }

    // category icon updated
    let catIcon = updateCategory.icon;
    if (icon) {
      catIcon = icon;
    }

    // category parentCategory updated
    let parewntCat = updateCategory.parentCategory;
    if (parentCategory) {
      catIcon = parentCategory;
    }

    // category photo updated
    let logoFile = updateCategory.photo;

    if (req.file) {
      const logo = await cloudUploads(req.file.path);
      logoFile = logo;
      await cloudPhotoDelete(updateCategory.photo);
    }

    updateCategory.name = name;
    updateCategory.slug = slugCreate(name);
    updateCategory.parentCategory = parewntCat;
    updateCategory.icon = catIcon;
    updateCategory.photo = logoFile;
    updateCategory.save();

    res.status(200).json({
      updateCategory,
      message: "Category updated successful",
    });
  } catch (error) {
    next(createError("Category update not found", 400));
  }
};
/**
 * status Update Category
 * @param {*} req
 * @param {*} res
 */
export const statusUpdateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // update Permission data
    const category = await Category.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );

    res.status(200).json({ category, message: "Status updated successful" });
  } catch (error) {
    next(createError("Category update not found", 400));
  }
};
