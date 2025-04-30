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

// Admin login route
adminRouter.post("/login", adminLogin);

// Product routes
adminRouter.post("/product", authenticateAdmin, createProductItem); // Create product
adminRouter.put("/product/:id", authenticateAdmin, updateProductItem); // Update product
adminRouter.delete("/product/:id", authenticateAdmin, deleteProductItem); // Delete product
adminRouter.get("/product", authenticateAdmin, getProductItems); // Get products with optional category filter

// Appointment routes
adminRouter.get("/appointment", authenticateAdmin, getAllUserAppointments); // Get all user appointments
adminRouter.put(
  "/appointment/:id/confirm",
  authenticateAdmin,
  confirmAppointment
); // Confirm an appointment

export default adminRouter;
