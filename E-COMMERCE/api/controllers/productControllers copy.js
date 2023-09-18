import { slugCreate } from "../helper/slugCreate.js";
import Product from "../models/Product.js";
import { cloudPhotoDelete, cloudUploads } from "../utils/cloudinary.js";
import { createError } from "../utils/createError.js";

/**
 * get all products
 * @param {*} req
 * @param {*} res
 */
export const getAllproducts = async (req, res, next) => {
  const products = await Product.find();
  if (products.length > 0) {
    return res.status(200).json(products);
  }

  res.status(400).json({ message: "Product data not found" });
};
/**
 * create Product
 * @param {*} req
 * @param {*} res
 */
export const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      productType,
      productSimple,
      productVariable,
      productGroup,
      productExternal,
      shotDesc,
      longDesc,
    } = req.body;

    if (!name) {
      next(createError("All fields are required"));
    }
    // Product check
    const productCheck = await Product.findOne({ name });

    if (productCheck) {
      next(createError("Product already axist"));
    }

    let logoFiles = [];

    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const logos = await cloudUploads(req.files[i].path);
        logoFiles.push(logos);
      }
    }

    // create data
    const product = await Product.create({
      name,
      slug: slugCreate(name),
      productType,
      productSimple: productType == "simple" ? JSON.parse(productSimple) : null,
      productVariable: productType == "variable" ? productVariable : null,
      productGroup: productType == "group" ? productGroup : null,
      productExternal: productType == "external" ? productExternal : null,
      shotDesc: shotDesc,
      longDesc: longDesc,
    });

    res.status(200).json({
      product,
      message: "Product created successful",
    });
  } catch (error) {
    console.log(error);
    next(createError("Product data can not Product", 400));
  }
};
/**
 * single Product
 * @param {*} req
 * @param {*} res
 */
export const singleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json({
      product,
      message: "Single data successful",
    });
  } catch (error) {
    next(createError("Single data not found", 400));
  }
};
/**
 * delete product Product
 * @param {*} req
 * @param {*} res
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    // Delete Product photo
    if (product.photo) {
      await cloudPhotoDelete(Product.photo);
    }

    res.status(200).json({
      product,
      message: "Product delete data successful",
    });
  } catch (error) {
    next(createError("Product delete not found", 400));
  }
};
/**
 * update product Product
 * @param {*} req
 * @param {*} res
 */
export const updatedProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      next(createError("All fields are required"));
    }
    const productUpdate = await Product.findById(id);

    if (!productUpdate) {
      next(createError("Product data not found"));
    }

    let logoFile = productUpdate.photo;

    if (req.file) {
      const logo = await cloudUploads(req.file.path);
      logoFile = logo;
      await cloudPhotoDelete(productUpdate.photo);
    }

    productUpdate.name = name;
    productUpdate.photo = logoFile;
    productUpdate.slug = slugCreate(name);
    productUpdate.save();

    res.status(200).json({
      productUpdate,
      message: "Product updated successful",
    });
  } catch (error) {
    next(createError("Product update not found", 400));
  }
};
/**
 * status Update Product
 * @param {*} req
 * @param {*} res
 */
export const statusUpdateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // update Permission data
    const product = await Product.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );

    res.status(200).json({ product, message: "Status updated successful" });
  } catch (error) {
    next(createError("Product update not found", 400));
  }
};
