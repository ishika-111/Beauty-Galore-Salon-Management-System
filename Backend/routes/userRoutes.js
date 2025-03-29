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
import { getProductItems } from "../controller/productController.js";

const userRouter = express.Router();

userRouter.post("/customer/login", customerLogin);
userRouter.post("/customer/register", customerRegister);
userRouter.put("/verify-email/:token", verifyEmail);
userRouter.post("/forgot-password", sendResetPasswordEmail);
userRouter.post("/reset-password/:token", resetPassword);
userRouter.post("/staff/login", staffLogin);
userRouter.post("/staff/register", staffRegister);
userRouter.get("/products", getProductItems);

export default userRouter;
