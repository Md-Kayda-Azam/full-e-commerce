import express from "express";
import {
  login,
  logOut,
  register,
  loggedInUser,
  makeHash,
  activateAccount,
  sendPasswordResetOtp,
  checkPasswordResetOtp,
  passwordReset,
  changePasswordUser,
  userProfileUpdate,
} from "../controllers/authControllers.js";
import tokenVerify from "../middlewares/verifyToken.js";

const routes = express.Router();
routes.post("/login", login);
routes.post("/logout", logOut);
routes.post("/hash", makeHash);
routes.post("/register", register);
routes.get("/activate/:token", activateAccount);
routes.post("/send-password-reset-opt", sendPasswordResetOtp);
routes.post("/check-password-reset-otp", checkPasswordResetOtp);
routes.post("/user-password-reset", passwordReset);
routes.patch("/cp/:id", changePasswordUser);
routes.put("/profile-update/:id", userProfileUpdate);

routes.get("/me", tokenVerify, loggedInUser);

export default routes;
