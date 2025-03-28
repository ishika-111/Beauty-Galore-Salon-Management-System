import express from "express";
import {
  customerLogin,
  customerRegister,
  staffLogin,
  staffRegister,
  adminLogin,
  adminRegister,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/customer/login", customerLogin);
userRouter.post("/customer/register", customerRegister);
userRouter.put("/verify-email/:token", verifyEmail);
userRouter.post("/forgot-password", sendResetPasswordEmail);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.post("/staff/login", staffLogin);
userRouter.post("/staff/register", staffRegister);
userRouter.post("/admin/login", adminLogin);
userRouter.post("/admin/register", adminRegister);

export default userRouter;
