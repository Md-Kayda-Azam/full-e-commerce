import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import bcrypt from "bcrypt";
import { isEmail } from "../helper/validate.js";
import {
  forgotPasswordSendMail,
  sendActivationLink,
} from "../helper/sendMail.js";
import { createToken, tokenVerify } from "../helper/token.js";
import { generateRandomCode } from "../helper/CodeGenerate.js";
import { cloudPhotoDelete, cloudUploads } from "../utils/cloudinary.js";

/**
 * @DESC Login User
 * @ROUTE /api/v1/auth/login
 * @method POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError("All fields are required", 400));
    }
    if (!isEmail(email)) {
      return next(createError("Invalid Email Address", 400));
    }
    // check user email
    const loginUser = await User.findOne({ email }).populate("role");

    if (!loginUser) {
      return next(createError("Invalid email, please valid email submit", 400));
    }

    // password check
    const passwordCheck = await bcrypt.compare(password, loginUser.password);

    // password check
    if (!passwordCheck) {
      return next(createError("Wrong password", 400));
    }

    // create access token
    const token = jwt.sign(
      { email: loginUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      }
    );
    // refresh access token
    const refreshToken = jwt.sign(
      { email: loginUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_IN,
      }
    );

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: (process.env.APP_ENV = "Development" ? false : true),
      sameSite: "strict",
      Path: "/",
      maxAge: 7 * 24 * 60 * 60 * 100,
    });

    res.status(200).json({
      token,
      user: loginUser,
      message: "User login successful",
    });
  } catch (error) {
    return next(createError("login data can not user", 400));
  }
};
/**
 * @DESC Log Out User
 * @ROUTE /api/v1/auth/logout
 * @method POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const logOut = async (req, res, next) => {
  res.clearCookie("accessToken");
  res.status(200).json({
    message: "LogOut Successfull",
  });
};
/**
 * @DESC Register User
 * @ROUTE /api/v1/auth/register
 * @method POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      next(createError("All fields are required"));
    }

    if (!isEmail(email)) {
      return next(createError("Invalid Email Address", 400));
    }
    // check user email
    const userEmailCheck = await User.findOne({ email });

    if (userEmailCheck) {
      return next(createError("Email already axist"));
    } else {
      // password hash
      const hashPassword = await bcrypt.hash(password, 10);

      // create data
      const user = await User.create({
        name,
        email,
        password: hashPassword,
      });
      const populatedUser = await User.findById(user._id)
        .populate("role")
        .exec();
      // create activation token
      const activationToken = createToken({ id: user._id }, "30d");

      sendActivationLink(user.email, {
        name: user.name,
        link: `${
          process.env.APP_URL + ":" + process.env.PORT
        }/api/v1/auth/activate/${activationToken}`,
        email: email,
      });

      res.status(200).json({
        populatedUser,
        message: "Create data successful",
      });
    }
  } catch (error) {
    next(createError("Create data can not user", 400));
  }
};
/**
 * @DESC loggedIN User
 * @ROUTE /api/v1/auth/register
 * @method POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const loggedInUser = async (req, res, next) => {
  res.status(200).json(req.me);
};
/**
 * @DESC MAke hash
 * @ROUTE /api/v1/auth/register
 * @method POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const makeHash = async (req, res, next) => {
  const { password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  res.status(200).json({ hashPassword });
};
/**
 * @access public
 * @route /api/user/account activate by email
 * @method Get
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const activateAccount = async (req, res, next) => {
  try {
    // get token
    const { token } = req.params;
    // check token
    if (!token) {
      next(createError(400, "Invalid activation token"));
    } else {
      // verify token
      const tokenData = tokenVerify(token);

      const data = await User.findById(tokenData.id);

      if (data.isActivate == true) {
        next(createError(400, "Account already activate"));
      } else {
        await User.findByIdAndUpdate(tokenData.id, {
          isActivate: true,
        });
      }

      res.status(200).json({
        message: "Account Activation Successfull",
      });
    }
  } catch (error) {
    next(error);
  }
};
/**
 * @access public
 * @route /api/user/account reset password
 * @method Get
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const sendPasswordResetOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    // check token
    if (!isEmail(email)) {
      return next(createError("Invalid Email"));
    } else {
      const data = await User.findOne({ email: email });

      if (!data) {
        return next(createError("Invalid Email Address"));
      } else {
        // forgot passwword code generate
        const code = generateRandomCode(6);

        const token = createToken({ id: data._id }, "30d");

        // send forgot password send email
        forgotPasswordSendMail(data.email, {
          name: data.name,
          email: email,
          code: code,
        });

        await User.findByIdAndUpdate(data.id, {
          access_token: code,
        });

        // send respone
        res
          .status(200)
          .cookie("otp", data.email, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "Activation link send",
          });
      }
    }
  } catch (error) {
    next(error);
  }
};
/**
 * @access public
 * @route /api/user/codeA ctivation Forgot Password
 * @method Get
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const checkPasswordResetOtp = async (req, res, next) => {
  try {
    const { code, email } = req.body;

    if (isEmail(email)) {
      const userData = await User.findOne({ email: email });

      if (!userData) {
        return next(createError("Invalid user request"));
      }
      if (userData) {
        if (userData.access_token != code) {
          return next(createError("Invalid OTP code!"));
        } else if (userData.access_token == code) {
          return res
            .cookie("cpid", userData._id.toString(), {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .cookie("cpcode", code, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .status(200)
            .json({
              message: "You can change your password",
            });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};
/**
 * password reset
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const passwordReset = async (req, res, next) => {
  try {
    const { id, code, password } = req.body;

    const userData = await User.findOne().and([
      { _id: id },
      { access_token: code },
    ]);
    // password hash
    const hashPassword = await bcrypt.hash(password, 10);
    if (!userData) {
      return next(createError("Password change request faild"));
    } else {
      await User.findByIdAndUpdate(id, {
        password: hashPassword,
        access_token: null,
      });

      const token = createToken({ id: userData._id }, "365d");
      return res
        .clearCookie("cpcode")
        .clearCookie("cpid")
        .clearCookie("otp")
        .status(200)
        .json({ message: "Password changed successful", token: token });
    }
  } catch (error) {
    next(error);
  }
};
/**
 * change password user
 * @param {*} req
 * @param {*} res
 */
export const changePasswordUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { oldPassword, password } = req.body;

    const data = await User.findById(id);

    const passwordCheck = await bcrypt.compare(oldPassword, data.password);

    if (!passwordCheck) {
      res.status(400).json({
        message: "Invalid password",
      });
    } else {
      // password hash
      const hashPassword = await bcrypt.hash(password, 10);
      // update statuss user data
      const user = await User.findByIdAndUpdate(
        id,
        {
          password: hashPassword,
        },
        { new: true }
      ).populate("role");

      res.status(200).json({
        user,
        message: "User updated status successful",
      });
    }
  } catch (error) {
    // next(createError("User status updated not found", 400));
    console.log(error);
  }
};
/**
 * user profile update
 * @param {*} req
 * @param {*} res
 *
 */
export const userProfileUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, gender, city, country } = req.body;

    if (!isEmail(email)) {
      return next(createError("Invalid Email Address", 400));
    }

    const userWithEmail = await User.findOne({
      email: email,
      _id: { $ne: id },
    });
    if (userWithEmail) {
      // Email already exists
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    // update statuss user data
    const user = await User.findByIdAndUpdate(
      id,
      {
        name: name,
        email: email,
        mobile: mobile,
        gender: gender,
        city: city,
        country: country,
      },
      { new: true }
    ).populate("role");

    res.status(200).json({
      user,
      message: "User updated successful",
    });
  } catch (error) {
    next(createError("User  updated not found", 400));
  }
};
/**
 * user profile update
 * @param {*} req
 * @param {*} res
 *
 */
export const userProfilePhotoUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      next(createError("User  updated not found", 400));
    }

    let logoFile = user.photo;
    if (req.file) {
      const logo = await cloudUploads(req.file.path);
      logoFile = logo;
      if (user.photo) {
        await cloudPhotoDelete(user.photo);
      }
    }

    const userData = await User.findByIdAndUpdate(
      id,
      {
        photo: logoFile,
      },
      { new: true }
    ).populate("role");

    res.status(200).json({
      user: userData,
      message: "User updated successful",
    });
  } catch (error) {
    next(createError("User  updated not found", 400));
  }
};
