import express from "express";

import {
  cancelOrder,
  getAllOrders,
  getCustomerOrders,
  placeOrder,
  updateOrderStatus,
} from "../controller/orderController.js";
import authenticateUser from "../Middleware/authMiddleware.js";
import { authenticateAdmin } from "../Middleware/adminAuthmiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", authenticateUser, placeOrder);
orderRouter.get("/orders", authenticateAdmin, getAllOrders); // Admin
orderRouter.put(
  "/orders/:orderId/status",
  authenticateAdmin,
  updateOrderStatus
);
orderRouter.get("/my-orders", authenticateUser, getCustomerOrders);
orderRouter.put("/cancel/:orderId", authenticateUser, cancelOrder);

// orderRouter.put("/update/:cartItemId", authenticateUser, updateCartItem);

// orderRouter.put("/orders/:orderId/status", authenticateUser, updateOrderStatus);
export default orderRouter;
