import express from "express";
import {
  createAppointment,
  cancelAppointment,
} from "../controller/appointmentController.js";
import authenticateUser from "../Middleware/authMiddleware.js"; // Import authentication middleware

const appointmentRouter = express.Router();

// Protect the routes with the authenticateUser middleware
appointmentRouter.post("/create", authenticateUser, createAppointment); // Book an appointment (requires authentication)
appointmentRouter.delete("/cancel/:id", authenticateUser, cancelAppointment); // Delete an appointment (requires authentication)

export default appointmentRouter;
