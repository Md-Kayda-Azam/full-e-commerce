import { sendMail } from "../helper/sendMail.js";
import { isEmail } from "../helper/validate.js";
import User from "../models/User.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcrypt";

/**
 * get all users
 * @param {*} req
 * @param {*} res
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("role");

    if (users.length > 0) {
      res.status(200).json(users);
    }
  } catch (error) {
    next(createError("Data can not all brand get", 400));
  }
};
/**
 * create user
 * @param {*} req
 * @param {*} res
 */
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return next(createError("All fields are required"));
    }

    // check user email
    const userEmailCheck = await User.findOne({ email });

    if (userEmailCheck) {
      return next(createError("Email already axist"));
    }

    // password hash
    const hashPassword = await bcrypt.hash(password, 10);

    // create data
    const data = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    const populatedUser = await User.findById(data._id).populate("role").exec();
    // send user assecc to email
    sendMail({
      to: email,
      sub: "Account Access Info",
      msg: `Your account login access is email : ${email} & password : ${password}`,
    });

    res.status(200).json({
      user: populatedUser,
      message: `${name} user created successful`,
    });
  } catch (error) {
    // next(createError("Create data can not user", 400));
    console.log(error);
  }
};
/**
 * single user
 * @param {*} req
 * @param {*} res
 */
export const singleUsers = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json({
      user,
      message: "Single data successful",
    });
  } catch (error) {
    next(createError("Single data not found", 400));
  }
};
/**
 * delete delete user
 * @param {*} req
 * @param {*} res
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    res.status(200).json({
      user,
      message: "User delete data successful",
    });
  } catch (error) {
    next(createError("User delete not found", 400));
  }
};
/**
 * update  user
 * @param {*} req
 * @param {*} res
 */
export const updatedUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    // password hash
    const hashPassword = await bcrypt.hash(password, 10);

    // update user data
    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password: hashPassword,
        role,
      },
      { new: true }
    ).populate("role");

    res.status(200).json({
      user,
      message: "User update data successful",
    });
  } catch (error) {
    next(createError("User update not found", 400));
  }
};
/**
 * update user sttaus
 * @param {*} req
 * @param {*} res
 */
export const statusUpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // update statuss user data
    const user = await User.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    ).populate("role");

    res.status(200).json({
      user,
      message: "User updated status successful",
    });
  } catch (error) {
    next(createError("User status updated not found", 400));
  }
};
