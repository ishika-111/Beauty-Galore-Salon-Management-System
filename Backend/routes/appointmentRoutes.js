import express from "express";
import {
  createAppointment,
  cancelAppointment,
  getUserAppointments,
} from "../controller/appointmentController.js";
import authenticateUser from "../Middleware/authMiddleware.js"; // Import authentication middleware

const appointmentRouter = express.Router();

// Protect the routes with the authenticateUser middleware
appointmentRouter.post("/create", authenticateUser, createAppointment); // Book an appointment (requires authentication)
appointmentRouter.put("/:id/cancel", authenticateUser, cancelAppointment); // Delete an appointment (requires authentication)
appointmentRouter.get("/get", authenticateUser, getUserAppointments);

// Route to cancel an appointment

export default appointmentRouter;
