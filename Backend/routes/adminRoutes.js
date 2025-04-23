import express from "express";
import { adminLogin } from "../controller/authController.js";
import { authenticateAdmin } from "../Middleware/adminAuthmiddleware.js";
import {
  createProductItem,
  deleteProductItem,
  getProductItems,
  updateProductItem,
} from "../controller/productController.js";
import {
  confirmAppointment,
  getAllUserAppointments,
} from "../controller/appointmentController.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.post("/product", authenticateAdmin, createProductItem);
adminRouter.put("/product/:id", authenticateAdmin, updateProductItem);
adminRouter.delete("/product/:id", authenticateAdmin, deleteProductItem);
adminRouter.get("/product", authenticateAdmin, getProductItems);
adminRouter.get("/appointment", authenticateAdmin, getAllUserAppointments);
adminRouter.put(
  "/appointment/:id/confirm",
  authenticateAdmin,
  confirmAppointment
);

export default adminRouter;
