import { slugCreate } from "../helper/slugCreate.js";
import Brand from "../models/Brand.js";
import { cloudPhotoDelete, cloudUploads } from "../utils/cloudinary.js";
import { createError } from "../utils/createError.js";

/**
 * get all Brands
 * @param {*} req
 * @param {*} res
 */
export const getAllBrands = async (req, res, next) => {
  const brands = await Brand.find();
  if (brands.length > 0) {
    return res.status(200).json({ brands });
  }

  res.status(400).json({ message: "Brand data not found" });
};
/**
 * create brand
 * @param {*} req
 * @param {*} res
 */
export const createBrand = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      next(createError("Brand name is required!"));
    }
    // brand check
    const brandCheck = await Brand.findOne({ name });

    if (brandCheck) {
      next(createError("brand already axist"));
    }

    let logoFile = null;

    if (req.file) {
      const logo = await cloudUploads(req.file.path);
      logoFile = logo;
    }

    // create data
    const brand = await Brand.create({
      name,
      slug: slugCreate(name),
      photo: logoFile ? logoFile : null,
    });

    res.status(200).json({
      brand,
      message: "brand created successful",
    });
  } catch (error) {
    next(createError("Create data can not brand", 400));
  }
};
/**
 * single brand
 * @param {*} req
 * @param {*} res
 */
export const singleBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    res.status(200).json({
      brand,
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
export const deletebrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);

    // Delete Brand photo
    if (brand.photo) {
      await cloudPhotoDelete(brand.photo);
    }

    res.status(200).json({
      brand,
      message: "Brand delete data successful",
    });
  } catch (error) {
    next(createError("Brand delete not found", 400));
  }
};
/**
 * update product brand
 * @param {*} req
 * @param {*} res
 */
export const updatedbrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      next(createError("All fields are required"));
    }
    const brandUpdate = await Brand.findById(id);

    if (!brandUpdate) {
      next(createError("Brand data not found"));
    }

    let logoFile = brandUpdate.photo;

    if (req.file) {
      const logo = await cloudUploads(req.file.path);
      logoFile = logo;
      await cloudPhotoDelete(brandUpdate.photo);
    }

    brandUpdate.name = name;
    brandUpdate.photo = logoFile;
    brandUpdate.slug = slugCreate(name);
    brandUpdate.save();

    const brand = brandUpdate;
    res.status(200).json({
      brand,
      message: "brand updated successful",
    });
  } catch (error) {
    next(createError("brand update not found", 400));
  }
};
/**
 * status Update brand
 * @param {*} req
 * @param {*} res
 */
export const statusUpdatebrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // update brand data
    const brand = await Brand.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );

    res.status(200).json({ brand, message: "Status updated successful" });
  } catch (error) {
    next(createError("brand status update not found", 400));
  }
};

/**
 * All brand delete
 * @param {*} req
 * @param {*} res
 */
export const deleteBrands = async (req, res, next) => {
  try {
    const { _id } = req.body;

    const brands = await Brand.find({ _id: { $in: _id } });
    const photoList = brands.map((item) => item.photo);
    const idList = brands.map((item) => item._id);

    if (photoList) {
      for (let i = 0; i < photoList.length; i++) {
        await cloudPhotoDelete(photoList[i]);
      }
    }
    // Delete brands with matching _id values
    await Brand.deleteMany({ _id: { $in: _id } });

    res.status(200).json({ idList, message: "All Data deleted successful" });
  } catch (error) {
    console.log(error);
    next(createError("brand update not found", 400));
  }
};
